import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Modal from "./components/Modal";
import useCharacter from "./hooks/UseCharacter";

function App() {
  const [query, setQuery] = useState("");
  const {isLoading, characters} = useCharacter(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("FAVORITES")) || []);
  const [count, setCount] = useState(0)


  // useEffect(() => {
  // setIsLoading(true);
  // fetch("https://rickandmortyapi.com/api/character")
  // .then((res) => {
  //   if(!res.ok)
  //   {
  //     throw new Error("Something went wrong");
  //   }
  //   return res.json();
  // })
  // .then((data) => {
  // setCharacters(data.results.slice(0, 6)),
  // setIsLoading(false)
  // }).catch(error => {
  //   setIsLoading(false)
  //   toast.error(error.message)
  // }).finally(() => {
  //   setIsLoading(false)
  // });
  // }, [])

  // useEffect(() => {
  // setIsLoading(true);
  // axios.get("https://rickandmortyapi.com/api/character")
  // .then(({data}) => {
  // setCharacters(data.results.slice(0, 6)),
  // setIsLoading(false)
  // }).catch(error => {
  //   setIsLoading(false)
  //   toast.error(error.response.data.error)
  // }).finally(() => {
  //   setIsLoading(false)
  // });
  // }, [])

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favourites));
  }, [favourites])

  const handleSelectCharacter = (id) => {
    setSelectedId(prevId => prevId === id ? null : id);
  }

  const handleRemoveFavorite = (id) => {
    setFavorites(prevFavs => prevFavs.filter((fav) => fav.id !== id));
  }

  const handleAddFavorite = (character) => {
    setFavorites(prevFavs => [...prevFavs, character]);
  }

  const isAddedToFavourites = favourites.map((fav) => fav.id).includes(selectedId);

  
  return (
    <div className="App">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites favourites={favourites} onRemoveFavorite={handleRemoveFavorite}/>
      </Navbar>
      <Main>
      <CharacterList Characters={characters} isLoading={isLoading} onSelectCharacter={handleSelectCharacter} selectedId={selectedId}/>
      <CharacterDetail selectedId={selectedId} onAddFavorite={handleAddFavorite} isAddedToFavourites={isAddedToFavourites}/>
      </Main>
    </div>)
}

export default App;


function Main({children})
{
  return (
    <div className="main">
        {children}
    </div>
  )
}