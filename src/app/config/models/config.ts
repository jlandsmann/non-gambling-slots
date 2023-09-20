import {IconName} from "@fortawesome/fontawesome-common-types";
import {Theme} from "./theme";

export interface SlotMachineConfig {
  name?: string;
  availableItems: IconName[];
  numberOfSlots: number;
  finishedText?: string;
  targetConfiguration?: IconName[];
  theme: Theme;
}
