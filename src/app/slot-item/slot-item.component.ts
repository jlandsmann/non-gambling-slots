import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    concatMap,
    concatWith, delay, delayWhen, EMPTY, endWith, filter, finalize,
    interval,
    map,
    Observable, of,
    ReplaySubject,
    shareReplay,
    startWith,
    Subject, Subscription,
    switchMap, take, takeUntil,
    takeWhile, tap, timer
} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

const stepTime: number = 1000;

@Component({
    selector: 'ngsm-slot-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './slot-item.component.html',
    styleUrls: ['./slot-item.component.scss'],
    animations: [
        trigger('slot', [
            state('hidden', style({
                opacity: 0
            })),
            state('previous', style({
                transform: 'translateY(100%)'
            })),
            state('current', style({
                transform: 'translateY(0%)'
            })),
            state('next', style({
                transform: 'translateY(-100%)'
            })),
            transition('hidden => next', [
                style({transform: 'translateY(-200%)', opacity: 1}),
                animate(stepTime)
            ]),
            transition('previous => hidden', [
                animate(stepTime, style({transform: 'translateY(200%)', opacity: 1})),
            ]),
            transition('* => *', [
                animate(stepTime)
            ]),
        ])
    ]
})
export class SlotItemComponent implements OnChanges {

    @Input({required: true})
    items: number[] = [];

    @Input({required: true})
    targetIndex: number = 1;

    @Input({required: true})
    start$: Observable<void> = EMPTY;

    @Input({required: true})
    stop$: Observable<void> = EMPTY;

    indexToShow$: Observable<number>;
    indexToShow: number = 0;
    initialized: boolean = false;

    private readonly doStart$ = new Subject<void>();
    private startSubscription?: Subscription;

    constructor() {
        this.indexToShow$ = this.doStart$.pipe(
            tap(() => this.initialized = true),
            switchMap(() => interval(200).pipe(
                takeUntil(this.stop$),
                concatWith(
                    interval(100).pipe(
                        concatMap((x) => interval(250 + Math.pow(x, 1.2) * 50).pipe(
                            take(2)
                        )),
                        takeWhile((v, i) =>
                            i <= 2/3 * this.items.length || this.indexToShow !== this.targetIndex
                        )
                    )
                )
            )),
            map((x, i) => this.items.length - (i % this.items.length) - 1),
            startWith(0),
            tap(idx => this.indexToShow = idx),
            shareReplay(1)
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
      if ('start$' in changes) {
        this.startSubscription?.unsubscribe();
        this.startSubscription = this.start$.subscribe(() => this.doStart$.next());
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
}
