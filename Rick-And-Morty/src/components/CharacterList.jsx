import Character from "./Character";
import Loader from "./Loader.Jsx";

function CharacterList({Characters, isLoading}) {
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="Characters-list">
      {Characters.map((item) => (
        <Character key={item.id} character={item} />
      ))}
    </div>
  )
}

export default CharacterList

