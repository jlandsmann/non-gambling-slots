import {Injectable} from '@angular/core';
import type {SlotMachineConfig} from "../models";
import {DEFAULT_CONFIG} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly localStorage: Storage = localStorage;
  private readonly configKey: string = 'ngs-config';

  getConfig(): SlotMachineConfig {
    try {
      const stringConfig: string = this.localStorage.getItem(this.configKey) ?? '';
      return JSON.parse(stringConfig) as SlotMachineConfig;
    } catch (syntaxError) {
      return DEFAULT_CONFIG;
    }
  }

  setConfig(config: SlotMachineConfig): void {
    const stringConfig: string = JSON.stringify(config);
    this.localStorage.setItem(this.configKey, stringConfig);
  }

  updateConfig<K extends keyof SlotMachineConfig>(key: K, value: SlotMachineConfig[K]): void {
    const updatedConfig: SlotMachineConfig = {
      ...this.getConfig(),
      [key]: value
    };
    this.setConfig(updatedConfig);
  }
}
