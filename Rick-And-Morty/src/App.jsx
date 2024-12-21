import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);


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
    async function fetchData()
    {
    try{
      setIsLoading(true);
      const {data} = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`);
      
      setCharacters(data.results.slice(0, 8));
      // setIsLoading(false)
    } catch(error)
    {
      // setIsLoading(false)
      toast.error(error.response.data.error)
    } finally
    {
      setIsLoading(false)
    }}

    fetchData()
  }, [query])


  const handleSelectCharacter = (id) => {
    setSelectedId(prevId => prevId === id ? null : id);
  }

  
  return (
    <div className="App">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
      <CharacterList Characters={characters} isLoading={isLoading} onSelectCharacter={handleSelectCharacter}/>
      <CharacterDetail selectedId={selectedId}/>
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