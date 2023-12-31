import {Component, EventEmitter, Input, Output, TrackByFunction} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'ngsm-selection-list',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent<T> {

  @Input()
  trackByFn: TrackByFunction<T> = (idx,v) => idx;

  @Input()
  labelFn: (v: T) => string = (v) => {
    if (typeof v === 'string') return v;
    else if (typeof v === 'number') return v.toString();
    else return JSON.stringify(v);
  }

  @Input()
  availableItems: T[] = [];

  @Input()
  availableItemsLabel: string = '';

  @Input()
  selectedItems: T[] = [];

  @Output()
  readonly availableItemsChange = new EventEmitter<T[]>();

  @Output()
  readonly selectedItemsChange = new EventEmitter<T[]>();

  @Input()
  selectedItemsLabel: string = '';

  addItem(item?: T) {
    if (!item || this.selectedItems.includes(item)) return;
    this.moveItem(item, this.availableItems, this.selectedItems);
    this.availableItemsChange.emit(this.availableItems);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  removeItem(item?: T) {
    if (!item) return;
    this.moveItem(item, this.selectedItems, this.availableItems);
    this.availableItemsChange.emit(this.availableItems);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  addItemFromIndex(idx: number) {
    const item = this.availableItems.filter(i => !this.selectedItems.includes(i))[idx];
    this.addItem(item);
  }

  removeItemFromIndex(idx: number) {
    const item = this.selectedItems[idx];
    this.removeItem(item);
  }

  private moveItem(item: T, src: T[], dest: T[]): void {
    const idx = src.indexOf(item);
    if (idx < 0) return;
    src.splice(idx, 1);
    dest.push(item);
  }
}
