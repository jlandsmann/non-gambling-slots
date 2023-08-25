import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./slot-machine/slot-machine.component').then(m => m.SlotMachineComponent) },
  { path: 'config', loadComponent: () => import('./config/config.component').then(m => m.ConfigComponent) },
  { path: '**', redirectTo: '/' }
];
