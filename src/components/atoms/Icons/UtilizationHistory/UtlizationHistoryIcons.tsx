import { UTILIZATION_HISTORY_CATEGORY } from "cinq-common";
import ER from "./ER.svg";
import Inpatient from "./Inpatient.svg";

export const UtilizationHistoryIcons: Record<UTILIZATION_HISTORY_CATEGORY, JSX.Element> = {
  [UTILIZATION_HISTORY_CATEGORY.ER_VISIT]: <ER />,
  [UTILIZATION_HISTORY_CATEGORY.INPATIENT_VISIT]: <Inpatient />,
};

export const UtilizationHistoryIconsColors: Record<UTILIZATION_HISTORY_CATEGORY, string> = {
  [UTILIZATION_HISTORY_CATEGORY.ER_VISIT]: "pink.500",
  [UTILIZATION_HISTORY_CATEGORY.INPATIENT_VISIT]: "cyan.500",
};
