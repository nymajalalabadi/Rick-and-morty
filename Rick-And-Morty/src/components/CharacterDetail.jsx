import toast, { Toaster } from 'react-hot-toast';
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Loader from "./Loader.Jsx";
import axios from "axios";

function CharacterDetail({selectedId, onAddFavorite, isAddedToFavourites}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    async function fetchData(){
      try{
        setIsLoading(true);

        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
        setCharacter(data);

        const episodesId = data.episode.map((expisode) => expisode.split("/").at(-1));
 
        const {data : episodeData} = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`);
        setEpisodes([episodeData].flat());

      }catch(error)
      {
        toast.error(error.response.data.error);
      }finally
      {
        setIsLoading(false)
      }
    }

    if (selectedId){
      fetchData();
    }
  },[selectedId])

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        Please select a character.
      </div>
    );

    if (isLoading)
      return (
        <div style={{ flex: 1 }}>
          <Loader />
        </div>
      );
  

  return (
    <div style={{flex:1}}>
      <CharacterSubInfo character={character} onAddFavorite={onAddFavorite} isAddedToFavourites={isAddedToFavourites}/>
      <CharacterEpisodes episodes={episodes} />
    </div>
  )
}

export default CharacterDetail


function CharacterSubInfo ({character, onAddFavorite, isAddedToFavourites}) {
  return (
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
            {isAddedToFavourites ? <p>This Characater Is Added</p> : <button onClick={() => onAddFavorite(character)} className="btn btn--primary">Add to Favourites</button>}
          </div>
        </div>
      </div>
  )
}

function CharacterEpisodes ({episodes}) {
 const [sortBy, setSortBy] = useState(true);

 let sortedEpisodes;

 if (sortBy)
 {
  sortedEpisodes = [...episodes].sort((a,b) => new Date(a.created) - new Date(b.created));
 } else
 {
  sortedEpisodes = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created));
 }

  return (
    <div className="character-episodes">
    <div className="title">
      <h2>List Of Episodes</h2>
      <button onClick={() => setSortBy(is => !is)}>
      <ArrowUpCircleIcon className="icon" style={{ rotate: sortBy ? "0deg" : "180deg" }} />
      </button>
    </div>
    <ul>
      {
        sortedEpisodes.map((episode, index) => {
          return (
          <li key={episode.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {episode.episode} :{" "}
              <strong>{episode.name}</strong>
            </div>
            <div className="badge badge--secondary">{episode.air_date}</div>
          </li>
          )
        })
      }
    </ul>
  </div>
  )
}
