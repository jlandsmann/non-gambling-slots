import {Component, inject, TrackByFunction} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SlotMachineConfig} from "./models";
import {ConfigService} from "./services";
import {fas, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CdkListbox, CdkOption} from "@angular/cdk/listbox";
import {SelectionListComponent} from "./selection-list/selection-list.component";

@Component({
  selector: 'ngsm-config',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, CdkListbox, CdkOption, SelectionListComponent],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  readonly trackByIconName: TrackByFunction<IconDefinition> = (idx, item) => item.iconName;
  readonly labelByIconName: (v: IconDefinition) => string = v => v.iconName;
  readonly items: IconDefinition[] = Object.values(fas);
  readonly service: ConfigService = inject(ConfigService);
  config: SlotMachineConfig = this.service.getConfig();
  configurationTemplate: IconDefinition[] = new Array(this.config.numberOfSlots).fill(this.items[0], 0, this.config.numberOfSlots);

  updateNumberOfSlots(value: number): void {
    this.configurationTemplate = new Array(value).fill(this.items[0], 0, value);
    this.updateConfig('numberOfSlots', value);
  }

  toggleTargetConfiguration(): void {
    const targetConfiguration = this.config.targetConfiguration ? undefined : this.configurationTemplate;
    this.updateConfig('targetConfiguration', targetConfiguration)
  }

  updateConfig<K extends keyof SlotMachineConfig>(key: K, value: SlotMachineConfig[K]): void {
    this.config[key] = value;
    this.service.updateConfig(key, value)
  }
}
