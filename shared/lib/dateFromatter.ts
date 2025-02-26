export const DateFromatter = (dateTimeString: string) => {
  return dateTimeString.split(" ").slice(1, 4).join(" ");
};
