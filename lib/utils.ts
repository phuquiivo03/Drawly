export const cn = (...inputs: string[]) => {
  return inputs.reduce((prev, curr) => {
    return `${prev} ${curr}`;
  }, "");
};
