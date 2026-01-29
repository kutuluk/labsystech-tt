export const ntob = (array) => {
  let result = "";

  array.forEach((number) => {
    do {
      let chank = 0x3f & number;
      number >>>= 6;
      if (number > 0) {
        chank |= 0x40;
      }
      result += String.fromCharCode(chank);
    } while (number > 0);
  });

  return result;
};

export const bton = (str) => {
  let result = [];

  let number = 0;
  let offset = 0;

  for (let i = 0; i < str.length; i++) {
    const chank = str.charCodeAt(i);
    const next = chank & 0x40;
    number |= (chank & 0x3f) << offset;
    offset += 6;

    if (!next) {
      result.push(number);
      number = 0;
      offset = 0;
    }
  }

  return result;
};
