import { EyeIcon } from "@heroicons/react/24/outline"

function Character({character, onSelectCharacter}){
    return (
        <div className="list__item">
            <img src={character.image} alt={character.name} />
            <CharacterName name={character.name}  gender={character.gender}/>
            <CharacterInfo item={character}/>
            <button className="icon red" onClick={() => onSelectCharacter(character.id)}>
                <EyeIcon />
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