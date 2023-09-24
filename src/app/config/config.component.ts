import {Component, HostListener, inject, TrackByFunction} from '@angular/core';
import {CommonModule, LocationStrategy} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SlotMachineConfig} from "./models";
import {ConfigService} from "./services";
import {fas, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CdkListbox, CdkOption} from "@angular/cdk/listbox";
import {SelectionListComponent} from "./selection-list/selection-list.component";
import {IconName} from "@fortawesome/fontawesome-common-types";
import {Router} from "@angular/router";
import {fab} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'ngsm-config',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, CdkListbox, CdkOption, SelectionListComponent],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  readonly items: IconName[] = Array.from(new Set([
    ...Object.values(fas).map(i => i.iconName),
    ...Object.values(fab).map(i => i.iconName),
  ])).sort();
  readonly service: ConfigService = inject(ConfigService);
  config: SlotMachineConfig = this.service.getConfig();
  configurationTemplate: IconName[] = this.generateConfiguration();
  readonly trackByIndex: TrackByFunction<IconName> = (icon, idx) => idx;
  readonly trackByValue: TrackByFunction<IconName> = (value, idx) => value;

  private readonly location: LocationStrategy = inject(LocationStrategy);

  @HostListener('window:keydown.enter')
  onBackKeyDown(): void {
    this.location.back();
  }

  updateNumberOfSlots(value: number): void {
    this.configurationTemplate = new Array(value).fill(this.items[0], 0, value);
    this.updateConfig('numberOfSlots', value);
  }

  toggleTargetConfiguration(): void {
    const targetConfiguration = this.config.targetConfiguration ? undefined : this.generateConfiguration();
    this.updateConfig('targetConfiguration', targetConfiguration);
  }

  updateConfig<K extends keyof SlotMachineConfig>(key: K, value: SlotMachineConfig[K]): void {
    this.config[key] = value;
    this.service.updateConfig(key, value)
  }

  updateTargetConfiguration(i: number, $event: IconName) {
    const targetConfig = this.config.targetConfiguration?.fill($event, i, i+1);
    this.updateConfig('targetConfiguration', targetConfig);
  }

  private generateConfiguration(v?: IconName): IconName[] {
    return new Array(this.config.numberOfSlots).fill(v ?? this.config.availableItems[0], 0, this.config.numberOfSlots);
  }
}
