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
  labelFn: (v: T) => string = JSON.stringify;

  @Input()
  availableItems: T[] = [];

  @Input()
  availableItemsLabel: string = '';

  @Input()
  selectedItems: T[] = [];

  @Output()
  readonly selectedItemsChange = new EventEmitter<T[]>();

  @Input()
  selectedItemsLabel: string = '';

  addItem(item?: T) {
    if (!item || this.selectedItems.includes(item)) return;
    this.selectedItems.push(item);
  }

  removeItem(item?: T) {
    if (!item) return;
    const idx = this.selectedItems.indexOf(item);
    if (idx >= 0) this.selectedItems.splice(idx, 1);
  }

  addItemFromIndex(idx: number) {
    const item = this.availableItems.filter(i => !this.selectedItems.includes(i))[idx];
    this.addItem(item);
  }

  removeItemFromIndex(idx: number) {
    const item = this.selectedItems[idx];
    this.removeItem(item);
  }
}
