import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavorites] = useState([]);
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

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData()
    {
    try{
      setIsLoading(true);
      const {data} = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`, {signal});
      
      setCharacters(data.results.slice(0, 8));
      // setIsLoading(false)
    } 
    catch(error)
    {
      // setIsLoading(false)
      if(!axios.isCancel())
      {
        setCharacters([]);
        toast.error(error.response.data.error);
      }
    } finally
    {
      setIsLoading(false)
    }}

    fetchData();

    return () => {
      controller.abort();
    }

  }, [query])


  const handleSelectCharacter = (id) => {
    setSelectedId(prevId => prevId === id ? null : id);
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
        <Favourites numOffavourites={favourites.length} />
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