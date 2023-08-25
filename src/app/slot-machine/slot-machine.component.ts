import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlotItemComponent} from "../slot-item/slot-item.component";
import {Subject} from "rxjs";
import {
  faAnchor,
  faCoffee, faCrown,
  faGamepad,
  faHouse, faRecordVinyl, faRobot,
  faRocket, faVirus,
  faWandMagicSparkles,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'ngsm-slot-machine',
  standalone: true,
  imports: [CommonModule, SlotItemComponent],
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss']
})
export class SlotMachineComponent {

  readonly items: IconDefinition[] = [
  ];
  readonly start$ = new Subject<void>();
  readonly stop$ = new Subject<void>();

  currentConfiguration: [number, number, number] = [1, 1, 1];

  next(): void {
    this.currentConfiguration = [
      this.generateRandomIndex(),
      this.generateRandomIndex(),
      this.generateRandomIndex(),
    ];
    this.start$.next();
  }

  stop(): void {
    this.stop$.next();
  }

  private generateRandomIndex(): number {
    return Math.floor(Math.random() * this.items.length);
  }
}
