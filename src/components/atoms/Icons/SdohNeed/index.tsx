import { SDOH_NEED_TYPE } from "cinq-common/schemas/sdoh10";
import LivingSituationToday from "components/atoms/Icons/SdohNeed/LivingSituationToday.svg";
import LivingSituationProblems from "components/atoms/Icons/SdohNeed/LivingSituationProblems.svg";
import FoodWorried from "components/atoms/Icons/SdohNeed/FoodWorried.svg";
import FoodDidntLast from "components/atoms/Icons/SdohNeed/FoodDidntLast.svg";
import Transportation from "components/atoms/Icons/SdohNeed/Transportation.svg";
import Utilities from "components/atoms/Icons/SdohNeed/Utilities.svg";
import Hurt from "components/atoms/Icons/SdohNeed/Hurt.svg";
import Insult from "components/atoms/Icons/SdohNeed/Insult.svg";
import Threaten from "components/atoms/Icons/SdohNeed/Threaten.svg";
import Scream from "components/atoms/Icons/SdohNeed/Scream.svg";

export const SdohNeedIcon: Record<SDOH_NEED_TYPE, JSX.Element> = {
  [SDOH_NEED_TYPE.LIVING_SITUATION_TODAY]: <LivingSituationToday />,
  [SDOH_NEED_TYPE.LIVING_SITUATION_PROBLEMS]: <LivingSituationProblems />,
  [SDOH_NEED_TYPE.FOOD_WORRIED]: <FoodWorried />,
  [SDOH_NEED_TYPE.FOOD_DIDNT_LAST]: <FoodDidntLast />,
  [SDOH_NEED_TYPE.TRANSPORTATION]: <Transportation />,
  [SDOH_NEED_TYPE.UTILITIES]: <Utilities />,
  [SDOH_NEED_TYPE.HURT]: <Hurt />,
  [SDOH_NEED_TYPE.INSULT]: <Insult />,
  [SDOH_NEED_TYPE.THREATEN]: <Threaten />,
  [SDOH_NEED_TYPE.SCREAM]: <Scream />,
};
