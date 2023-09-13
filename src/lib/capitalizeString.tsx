export const capitalize = (value: string = "") => {
  return value.charAt(0) + value.slice(1).replaceAll("_", " ").toLowerCase();
};

export const capitalizeEveryFirstLetter = ({
  value,
  valuesUnchanged = [],
}: {
  value: string;
  valuesUnchanged?: Array<string>;
}) => {
  return value
    .split("_")
    .map((word) => (valuesUnchanged.includes(word) ? word : capitalize(word)))
    .join(" ");
};

export const capitalizeCamelCase = (toUpperCaseWords: string[] = []) => {
  return (word: string) => {
    const splitedWord = word.split(/(?=[A-Z])/);
    return splitedWord
      .reduce((acc, item) => {
        if (toUpperCaseWords.includes(item)) {
          return (acc += ` ${item.toUpperCase()}`);
        }
        if (item === "Of") {
          return (acc += ` ${item.toLowerCase()}`);
        }
        return (acc += ` ${item.charAt(0).toUpperCase() + item.slice(1)}`);
      }, "")
      .trim();
  };
};
