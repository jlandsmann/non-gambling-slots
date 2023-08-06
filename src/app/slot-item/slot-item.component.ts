import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    concatMap,
    concatWith, delay, delayWhen, endWith, finalize,
    interval,
    map,
    Observable,
    ReplaySubject,
    shareReplay,
    startWith,
    Subject,
    switchMap, take,
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
                display: 'none'
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
                style({transform: 'translateY(-200%)'}),
                animate(stepTime)
            ]),
            transition('previous => hidden', [
                animate(stepTime, style({transform: 'translateY(200%)'})),
            ]),
            transition('* => *', [
                animate(stepTime)
            ]),
        ])
    ]
})
export class SlotItemComponent {
    @Input({required: true})
    items: number[] = [];

    private x = 0;

    @Input({required: true})
    set currentIndex(value: number) {
        this.x = 0;
        this.currentIndex$.next(value);
    }

    @Input({required: true})
    stopped: boolean = true;

    readonly indexToShow$: Observable<number>;
    private readonly currentIndex$: Subject<number> = new ReplaySubject<number>(1);

    constructor() {
        this.indexToShow$ = this.currentIndex$.pipe(
            switchMap((targetIndex) => interval(200).pipe(
                takeWhile(() => !this.stopped),
                startWith(0),
                concatWith(
                    interval(100).pipe(
                        startWith(0),
                        take((2/3) * this.items.length),
                        concatMap((x) => interval(400 + Math.pow(x, 1.2) * 50).pipe(
                            take(2)
                        ))
                    )
                ),
                tap(() => {
                    if (this.stopped) this.x++;
                }),
                map((x, i) => this.items.length - (i % this.items.length) - 1),
                takeWhile(idx => this.x <= (this.items.length / 2) || idx !== (this.items.length + targetIndex - 1) % this.items.length),
            )),
            shareReplay(1)
        );
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
