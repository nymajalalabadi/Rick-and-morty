import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

function Character({character, onSelectCharacter, selectedId}){
    return (
        <div className="list__item">
            <img src={character.image} alt={character.name} onClick={() => onSelectCharacter(character.id)}/>
            <CharacterName name={character.name}  gender={character.gender}/>
            <CharacterInfo item={character}/>
            <button className="icon red" onClick={() => onSelectCharacter(character.id)}>
                {selectedId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
        </div>
    )
}

export default Character;

function CharacterName({name, gender}){
    return (
      <h3 className="name">
      <span>{gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
      <span> {name}</span>
      </h3>
    )
}

function CharacterInfo({item}){
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status}</span>
      <span> - {item.species}</span>
    </div>
  )
}