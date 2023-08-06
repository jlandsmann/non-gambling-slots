import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SlotMachineComponent} from "./slot-machine/slot-machine.component";

@Component({
  selector: 'ngsm-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SlotMachineComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'non-gambling-slots';
}
