import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SlotMachineComponent} from "./slot-machine/slot-machine.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'ngsm-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, SlotMachineComponent],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { }
