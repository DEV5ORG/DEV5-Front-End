export const getFirstWord = (text: string) => {
  if (!text) return "";
  return text.trim().split(" ")[0];
};
