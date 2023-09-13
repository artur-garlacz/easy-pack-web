import Mosquito from "./Mosquito.svg";
import Virus from "./Virus.svg";
import BloodCells from "./Blood-cells.svg";
import Pancreas from "./Pancreas.svg";
import Neurology from "./Neurology.svg";
import Nerve from "./Nerve.svg";
import Eye from "./Eye.svg";
import Heart from "./Heart.svg";
import Pneumonia from "./Pneumonia.svg";
import Stomach from "./Stomach.svg";
import Allergies from "./Allergies.svg";
import Skull from "./Skull.svg";
import FemaleReproductiveSystem from "./Female-reproductive-system.svg";
import Lactation from "./Lactation.svg";
import DNA from "./DNA.svg";
import Symptom from "./Symptom.svg";
import AlertCircle from "./Alert-circle.svg";
import AlertTriangle from "./Alert-triangle.svg";
import Pregnant from "./Pregnant.svg";
import { ICD10_DIAGNOSES_DICTIONARY } from "cinq-common/schemas/conditions";
import { DiagnosisType } from "cinq-common/index";

export const DiagnosisIcon: Record<DiagnosisType, JSX.Element> = {
  [ICD10_DIAGNOSES_DICTIONARY.AB]: <Mosquito />,
  [ICD10_DIAGNOSES_DICTIONARY.C]: <Virus />,
  [ICD10_DIAGNOSES_DICTIONARY.D]: <BloodCells />,
  [ICD10_DIAGNOSES_DICTIONARY.E]: <Pancreas />,
  [ICD10_DIAGNOSES_DICTIONARY.F]: <Neurology />,
  [ICD10_DIAGNOSES_DICTIONARY.G]: <Nerve />,
  [ICD10_DIAGNOSES_DICTIONARY.H]: <Eye />,
  [ICD10_DIAGNOSES_DICTIONARY.I]: <Heart />,
  [ICD10_DIAGNOSES_DICTIONARY.J]: <Pneumonia />,
  [ICD10_DIAGNOSES_DICTIONARY.K]: <Stomach />,
  [ICD10_DIAGNOSES_DICTIONARY.L]: <Allergies />,
  [ICD10_DIAGNOSES_DICTIONARY.M]: <Skull />,
  [ICD10_DIAGNOSES_DICTIONARY.N]: <FemaleReproductiveSystem />,
  [ICD10_DIAGNOSES_DICTIONARY.O]: <Pregnant />,
  [ICD10_DIAGNOSES_DICTIONARY.P]: <Lactation />,
  [ICD10_DIAGNOSES_DICTIONARY.Q]: <DNA />,
  [ICD10_DIAGNOSES_DICTIONARY.R]: <Symptom />,
  [ICD10_DIAGNOSES_DICTIONARY.S]: <AlertTriangle />,
  [ICD10_DIAGNOSES_DICTIONARY.Z]: <AlertCircle />,
  [ICD10_DIAGNOSES_DICTIONARY.$FALLBACK]: <></>,
};
