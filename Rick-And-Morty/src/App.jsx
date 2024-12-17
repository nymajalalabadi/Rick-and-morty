import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";

function App(){
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  // setIsLoading(true);
  // fetch("https://rickandmortyapi.com/api/character")
  // .then((r) => r.json())
  // .then((data) => {
  // setCharacters(data.results.slice(0, 6)),
  // setIsLoading(false)
  // });
  // }, [])

  useEffect(() => {
    async function fetchData(){
    setIsLoading(true);
    const reslut = await fetch("https://rickandmortyapi.com/api/character");
    const data = await reslut.json();
    setCharacters(data.results.slice(0, 6));
    setIsLoading(false);
    }
    fetchData()
  }, [])

  return (
    <div className="App">
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