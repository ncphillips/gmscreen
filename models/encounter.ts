import { D20 } from './dice';

/**
 * Model
 */
export interface EncounterState {
  activeCharacter: string;
  characters: Character[];
}

export interface EncounterMethods {
  addCharacter(character: Character): void;
  nextTurn(): void;
}

export interface Encounter extends EncounterMethods, EncounterState {}

export class Character {
  initiative: number;

  constructor(public name: string, public initMod?: number) {
    this.initiative = D20.roll() + initMod;
  }
}
