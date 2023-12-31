import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  concatMap,
  concatWith,
  EMPTY, finalize,
  interval,
  map,
  mergeWith,
  Observable,
  ReplaySubject,
  shareReplay,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap
} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconName} from "@fortawesome/fontawesome-common-types";
import {fas, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";

const stepTime: number = 1000;

@Component({
    selector: 'ngsm-slot-item',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './slot-item.component.html',
    styleUrls: ['./slot-item.component.scss'],
    animations: [
        trigger('slot', [
            state('hidden', style({
                opacity: 0
            })),
            state('previous', style({
                transform: 'translateY(100%) rotateX(45deg)'
            })),
            state('current', style({
                transform: 'translateY(0%) rotateX(0deg)'
            })),
            state('next', style({
                transform: 'translateY(-100%) rotateX(-45deg)'
            })),
            transition('hidden => next', [
                style({transform: 'translateY(-200%) rotateX(-90deg)', opacity: 1}),
                animate(stepTime)
            ]),
            transition('previous => hidden', [
                animate(stepTime, style({transform: 'translateY(200%) rotateX(90deg)', opacity: 1})),
            ]),
            transition('* => *', [
                animate(stepTime)
            ]),
        ])
    ]
})
export class SlotItemComponent implements OnInit, OnChanges {

    @Input({required: true})
    items: IconName[] = [];

    @Input({required: true})
    target!: IconName;

    @Input()
    logging: boolean = false;

    @Input({required: true})
    start$: Observable<void> = EMPTY;

    @Input({required: true})
    stop$: Observable<void> = EMPTY;

    @Output()
    readonly stop: EventEmitter<void> = new EventEmitter<void>();

    indexToShow$: Observable<number>;
    indexToShow: number = 0;
    initialized: boolean = false;
    startIndex: number = 0;
    iconsToShow: IconDefinition[] = [];

    private readonly doStart$ = new Subject<void>();
    private readonly startIndex$ = new ReplaySubject<number>(1);
    private readonly iconLibrary = inject(FaIconLibrary);
    private startSubscription?: Subscription;

    constructor() {
        this.indexToShow$ = this.doStart$.pipe(
            tap(() => this.initialized = true),
            switchMap(() => interval(250).pipe(
                takeUntil(this.stop$),
                concatWith(
                    interval(100).pipe(
                        map((value, index) => 400 + (350 / (1 + Math.exp(-0.002 * 350 * index) * 400))),
                        map(v => Math.round(v)),
                        concatMap(value => interval(value).pipe(take(1))),
                        takeWhile((v, i) =>
                            i <= 8 || this.items[this.indexToShow] !== this.target
                        ),
                        finalize(() => this.stop.next())
                    )
                )
            )),
            map((x, i) => this.moduloItemCount(this.startIndex - i)),
            mergeWith(this.startIndex$),
            tap(idx => this.indexToShow = idx),
            shareReplay(1)
        );
    }

    ngOnInit(): void {
        this.startIndex = Math.floor(Math.random() * this.items.length);
        this.startIndex$.next(this.startIndex);
        this.startIndex$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if ('start$' in changes) {
        this.startSubscription?.unsubscribe();
        this.startSubscription = this.start$.subscribe(() => this.doStart$.next());
      }

      if ('items' in changes) {
        const iconNames = changes['items'].currentValue as IconName[];
        this.iconsToShow = iconNames.map(iconName =>
          this.iconLibrary.getIconDefinition('fas', iconName) ??
          this.iconLibrary.getIconDefinition('fab', iconName)
        ).filter((icon): icon is IconDefinition => !!icon);
      }
    }

    calcOffsetClass(itemIdx: number, referenceIdx: number): string {
        if (referenceIdx === 0 && itemIdx === this.items.length - 1) {
            return 'next';
        } else if (referenceIdx === this.items.length - 1 && itemIdx === 0) {
            return 'previous';
        } else if (itemIdx === referenceIdx) {
            return 'current';
        } else if (itemIdx === referenceIdx + 1) {
            return 'previous'
        } else if (itemIdx === referenceIdx - 1) {
            return 'next'
        }
        return 'hidden';
    }

    private moduloItemCount(x: number): number {
      if (x < 0) {
        x += (Math.abs(Math.ceil(x / this.items.length)) + 1) * this.items.length;
      }
      return x % this.items.length;
    }
}
