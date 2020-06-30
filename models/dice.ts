export class Dice {
  constructor(public numSides: number) {}
  roll() {
    return Math.ceil(Math.random() * this.numSides);
  }
}

export class D20 extends Dice {
  constructor() {
    super(20);
  }
  static roll() {
    return new Dice(20).roll();
  }
}
