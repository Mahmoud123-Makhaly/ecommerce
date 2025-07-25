export const getMaxLength = (text: string, max: number = 50) => {
  if (text.length >= max) {
    return `${text.slice(0, max)}...`;
  }
  return text;
};
