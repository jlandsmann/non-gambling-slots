import {Component, HostListener, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlotItemComponent} from "../slot-item/slot-item.component";
import {Subject} from "rxjs";
import {
  faAnchor,
  faCoffee, faCrown,
  faGamepad,
  faHouse, faRecordVinyl, faRobot,
  faRocket, fas, faVirus,
  faWandMagicSparkles,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {ConfigService} from "../config/services";
import {IconName} from "@fortawesome/fontawesome-common-types";
import {Router} from "@angular/router";
import {SlotMachineConfig} from "../config/models";

@Component({
  selector: 'ngsm-slot-machine',
  standalone: true,
  imports: [CommonModule, SlotItemComponent],
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss']
})
export class SlotMachineComponent {

  readonly name?: string;
  readonly items: IconName[];
  readonly slots: number[];
  readonly start$ = new Subject<void>();
  readonly stop$ = new Subject<void>();

  private readonly config: SlotMachineConfig = inject(ConfigService).getConfig();
  private readonly router: Router = inject(Router);

  currentConfiguration: IconName[];
  started: boolean = false;

  constructor() {
    this.name = this.config.name;
    this.items = this.config.availableItems;
    this.slots = new Array<number>(this.config.numberOfSlots).fill(0, 0, this.config.numberOfSlots);
    this.currentConfiguration = this.generateRandomConfiguration();
  }

  @HostListener('window:keydown.space')
  @HostListener('window:keydown.enter')
  onMainKeydown(): void {
    if (this.started) this.stop();
    else this.next();
  }

  @HostListener('window:keydown.s')
  @HostListener('window:keydown.c')
  onSettingsKeyDown(): void {
    this.router.navigate(['config']);
  }

  next(): void {
    this.started = true;
    this.currentConfiguration = this.config.targetConfiguration ?? this.generateRandomConfiguration();
    this.start$.next();
  }


  stop(): void {
    this.stop$.next();
  }

  private generateRandomConfiguration(): IconName[] {
    return this.slots.map(() => this.generateRandomIndex()).map(idx => this.items[idx]);
  }

  private generateRandomIndex(): number {
    return Math.floor(Math.random() * this.items.length);
  }
}
