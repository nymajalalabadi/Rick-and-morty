import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import toast, { Toaster } from 'react-hot-toast';

function App(){
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


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

  useEffect(() => {
    async function fetchData()
    {
    try{
      setIsLoading(true);
      const reslut = await fetch("https://rickandmortyapi.com/api/character");
      if(!reslut.ok)
      {
        throw new Error("Something went wrong");
      }
      const data = await reslut.json();
      setCharacters(data.results.slice(0, 6));
      // setIsLoading(false)
    } catch(error)
    {
      // setIsLoading(false)
      console.log(error.message);
      toast.error(error.message)
    } finally{
      setIsLoading(false)
    };
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <Toaster />
      <Navbar>
      <div className="navbar__result">
        <SearchResult numOfResult={characters.length} />
      </div>
      </Navbar>
      <Main>
      <CharacterList Characters={characters} isLoading={isLoading}/>
      <CharacterDetail />
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