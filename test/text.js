import { expect } from "chai";
import { ntob, bton } from "../src/index.js";

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getArray = (count, min, max) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(getRandomIntInclusive(min, max));
  }
  return array;
};

const random50 = getArray(50, 1, 300);
const random100 = getArray(100, 1, 300);
const random500 = getArray(500, 1, 300);
const random1000 = getArray(1000, 1, 300);

const digit1 = getArray(900, 1, 9);
const digit2 = getArray(900, 10, 99);
const digit3 = getArray(900, 100, 300);

const mix = [
  ...digit1.slice(0, 300),
  ...digit2.slice(0, 300),
  ...digit3.slice(0, 300),
];

const badCase = getArray(1000, 64, 99);

const test = (array) => {
  const str = ntob(array);
  const back = bton(str);

  const stupid = array.join(",");

  //console.log('%s -> "%s" -> %s', array, str, back);
  console.log(stupid.length / str.length);

  return { back, ratio: stupid.length / str.length };
};

describe("Tests", () => {
  it("50 рандомных", () => {
    const { back, ratio } = test(random50);
    expect(back).to.deep.equal(random50);
    expect(ratio).to.be.at.least(2);
  });

  it("100 рандомных", () => {
    const { back, ratio } = test(random100);
    expect(back).to.deep.equal(random100);
    expect(ratio).to.be.at.least(2);
  });

  it("500 рандомных", () => {
    const { back, ratio } = test(random500);
    expect(back).to.deep.equal(random500);
    expect(ratio).to.be.at.least(2);
  });

  it("1000 рандомных", () => {
    const { back, ratio } = test(random1000);
    expect(back).to.deep.equal(random1000);
    expect(ratio).to.be.at.least(2);
  });

  it("900 1-знаковых", () => {
    const { back, ratio } = test(digit1);
    expect(back).to.deep.equal(digit1);
    expect(ratio).to.be.at.least(2);
  });

  it("900 2-знаковых", () => {
    const { back, ratio } = test(digit2);
    expect(back).to.deep.equal(digit2);
    expect(ratio).to.be.at.least(2);
  });

  it("900 3-знаковых", () => {
    const { back, ratio } = test(digit3);
    expect(back).to.deep.equal(digit3);
    expect(ratio).to.be.at.least(2);
  });

  it("900 миксованных", () => {
    const { back, ratio } = test(mix);
    expect(back).to.deep.equal(mix);
    expect(ratio).to.be.at.least(2);
  });

  it("1000 в худшем сценарии", () => {
    const { back, ratio } = test(badCase);
    expect(back).to.deep.equal(badCase);
    expect(ratio).to.be.at.least(2);
  });
});
