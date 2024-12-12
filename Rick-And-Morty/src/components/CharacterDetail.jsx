import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline"
import { character, episodes } from "../../data/data"

function CharacterDetail() {
  return (
    <div style={{flex:1}}>
      <div className="character-detail">
        <img src={character.image} alt={character.name} className="character-detail__img"/>
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
            <span>&nbsp;{character.name}</span>
          </h3>
          <div className="info">
            <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
            <span>&nbsp;{character.status}</span>
            <span>- &nbsp;{character.species}</span>
          </div>
          <div className="location">
            <p>last known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to Favourites</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List Of Episodes</h2>
          <button>
            <ArrowUpCircleIcon className="icon" />
          </button>
        </div>
        <ul>
          {
            episodes.map((episode, index) => {
              return (
                <li key={episode.id}>
                  <div>
                    {String(index + 1).padStart(2, "0")}  {episode.episode} : <strong>{episode.name}</strong>
                  </div>
                  <div className="badge badge--secondary">{episode.air__date}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default CharacterDetail
