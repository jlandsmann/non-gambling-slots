import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlotItemComponent} from "../slot-item/slot-item.component";
import {Subject} from "rxjs";

@Component({
  selector: 'ngsm-slot-machine',
  standalone: true,
  imports: [CommonModule, SlotItemComponent],
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss']
})
export class SlotMachineComponent {

  readonly items: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  currentConfiguration: [number, number, number] = [
    this.generateRandomIndex(),
    this.generateRandomIndex(),
    this.generateRandomIndex(),
  ];
  stopped: boolean = false;

  next(): void {
    this.stopped = false;
    this.currentConfiguration = [
      this.generateRandomIndex(),
      this.generateRandomIndex(),
      this.generateRandomIndex(),
    ];
  }

  stop(): void {
    this.stopped = true;
  }

  private generateRandomIndex(): number {
    return Math.floor(Math.random() * this.items.length);
  }
}
