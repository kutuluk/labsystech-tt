export const ntob = (array) => {
  let result = "";

  array.forEach((number) => {
    const chanks = [];
    do {
      chanks.push(0x3f & number);
      number >>>= 6;
    } while (number > 0);

    const length = chanks.length;

    for (let i = 0; i < length; i++) {
      if (i < length - 1) {
        chanks[i] |= 0x40;
      }
      result += String.fromCharCode(chanks[i]);
    }
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
    number |= (chank & 0x3f) << (6 * offset++);

    if (!next) {
      result.push(number);
      number = 0;
      offset = 0;
    }
  }

  return result;
};
