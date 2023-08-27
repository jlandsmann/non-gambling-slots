import {SlotMachineConfig} from "./config";
import {
  faAnchor,
  faCoffee, faCrown,
  faGamepad,
  faHouse, faRecordVinyl,
  faRobot,
  faRocket, faVirus,
  faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";

export const DEFAULT_CONFIG: SlotMachineConfig = {
  availableItems: [
    faCoffee, faHouse, faWandMagicSparkles, faRocket, faGamepad,
    faAnchor, faRobot, faCrown, faRecordVinyl, faVirus,
  ],
  numberOfSlots: 3,
  randomTargetConfiguration: true,
};
