import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SlotMachineComponent} from "./slot-machine/slot-machine.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'ngsm-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, SlotMachineComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'non-gambling-slots';
}
