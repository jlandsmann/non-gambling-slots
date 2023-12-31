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
import {BasicGreenTheme} from "./themes/basic-green.theme";

export const DEFAULT_CONFIG: SlotMachineConfig = {
  availableItems: [
    faCoffee, faHouse, faWandMagicSparkles, faRocket, faGamepad,
    faAnchor, faRobot, faCrown, faRecordVinyl, faVirus,
  ].map(i => i.iconName),
  numberOfSlots: 3,
  theme: BasicGreenTheme
};
