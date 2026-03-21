export type QuestionType =
  | "gender"
  | "weight"
  | "length"
  | "eyeColor"
  | "hairColor"
  | "birthDate"
  | "birthTime"
  | "name"
  | "looksLike";

export type QuestionInputType =
  | "select"
  | "number"
  | "date"
  | "time"
  | "text";

export interface QuestionConfig {
  key: QuestionType;
  inputType: QuestionInputType;
  options?: string[];
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const questionConfigs: QuestionConfig[] = [
  {
    key: "gender",
    inputType: "select",
    options: ["boy", "girl"],
  },
  {
    key: "weight",
    inputType: "number",
    unit: "g",
    min: 1500,
    max: 6000,
    step: 50,
  },
  {
    key: "length",
    inputType: "number",
    unit: "cm",
    min: 35,
    max: 65,
    step: 0.5,
  },
  {
    key: "eyeColor",
    inputType: "select",
    options: ["blue", "brown", "green", "hazel", "gray"],
  },
  {
    key: "hairColor",
    inputType: "select",
    options: ["blonde", "brown_hair", "black", "red"],
  },
  {
    key: "birthDate",
    inputType: "date",
  },
  {
    key: "birthTime",
    inputType: "time",
  },
  {
    key: "name",
    inputType: "text",
  },
  {
    key: "looksLike",
    inputType: "select",
    options: ["mother", "father"],
  },
];

export function getQuestionConfig(key: QuestionType): QuestionConfig | undefined {
  return questionConfigs.find((q) => q.key === key);
}
