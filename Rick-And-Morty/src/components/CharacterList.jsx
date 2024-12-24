import Character from "./Character";
import Loader from "./Loader.Jsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { Children } from "react";

function CharacterList({Characters, isLoading, onSelectCharacter, selectedId}) {
  if (isLoading) 
  {
    return <Loader />
  }

  return (
    <div className="Characters-list">
      {Characters.map((character) => (
        <Character key={character.id} character={character}>
          <button className="icon red" onClick={() => onSelectCharacter(character.id)}>
              {selectedId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  )
}

export default CharacterList

