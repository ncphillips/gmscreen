import { D20 } from './dice';

/**
 * Model
 */
export interface EncounterState {
  characters: Character[];
}

export interface EncounterMethods {
  addCharacter(character: Character): void;
}

export interface Encounter extends EncounterMethods, EncounterState {}

export class Character {
  initiative: number;

  constructor(public name: string, public initMod?: number) {
    this.initiative = D20.roll() + initMod;
  }
}
