import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";

function App(){
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
    .then((r) => r.json())
    .then((data) => setCharacters(data.results.slice(0, 6)))
  }, [])

  return (
    <div className="App">
      <Navbar>
      <div className="navbar__result">
        <SearchResult numOfResult={characters.length} />
      </div>
      </Navbar>
      <Main>
      <CharacterList Characters={characters}/>
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