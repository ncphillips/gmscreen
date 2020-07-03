import { useRouter } from 'next/router';
import { useEncounter } from '@encounters';
import { InitiativeOrder } from '@components/initiative-order';
import { AddCharacterForm } from '@components/add-character';
import { useCharacterCollection, useCharacter } from '@characters';
import { useEncounterCharacters } from '@encounter-characters';

export default function DisplayEncounter() {
  const router = useRouter();
  const id = router.query.id;

  const encounter = useEncounter(id as string);
  const encounterCharacters = useEncounterCharacters();
  const charactersCollection = useCharacterCollection();

  if (!encounter) return <h2>404</h2>;

  return (
    <div>
      <h2>{encounter.name}</h2>

      <button
        onClick={() => {
          encounterCharacters
            .toArray()
            .filter(({ encounterId }) => encounterId === id)
            .forEach(({ id, characterId }) => {
              delete charactersCollection[characterId];
              delete encounterCharacters[id];
            });
        }}
      >
        Reset Encounter
      </button>
      <AddCharacterForm encounter={encounter} />
      <button
        onClick={() => {
          const characters = encounterCharacters
            .toArray()
            .filter(({ encounterId }) => encounterId === id)
            .sort((a, b) => b.initiative - a.initiative)
            .map(({ characterId }) => charactersCollection[characterId]);

          const prev = characters.findIndex(
            ({ name }) => name === encounter.activeCharacter
          );
          const next = Math.floor((prev + 1) % characters.length);

          encounter.activeCharacter = characters[next].name;
        }}
      >
        Next Turn
      </button>
      <InitiativeOrder id={encounter.id} />
    </div>
  );
}
