import {IconName} from "@fortawesome/fontawesome-common-types";

export interface SlotMachineConfig {
  name?: string;
  availableItems: IconName[];
  numberOfSlots: number;
  randomTargetConfiguration: boolean;
  targetConfiguration?: IconName[];
}
