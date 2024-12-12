import Character from "./Character";

function CharacterList({Characters}) {
  return (
    <div className="Characters-list">
      {Characters.map((item) => (
        <Character key={item.id} character={item} />
      ))}
    </div>
  )
}

export default CharacterList

