import { Encounter } from '@components/encounter';

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

export interface Character {
  name: string;
  initiative: number;
}
