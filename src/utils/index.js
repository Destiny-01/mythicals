export const randomNumbers = (length) => {
  let value = "";
  const characters = "01234567890";
  while (value.length < length) {
    const input = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    value += !value.includes(input) ? input : "";
  }
  return value;
};
