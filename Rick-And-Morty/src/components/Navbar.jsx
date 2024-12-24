import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { character } from "../../data/data";
import Character from "./Character";

function Navbar({children}) {
  return (
    <div className="navbar">
      <Logo />
      {children}
    </div>
  )
}

export default Navbar

function Logo() {
  return (
    <div className="navbar__logo">LOGO</div>
  )
}


export function Search({query, setQuery}) {
  return (
    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="text-field" placeholder="Search ..." />
  )
}


export function SearchResult({numOfResult}) {
  return (
    <div className="navbar__result">Found {numOfResult} Characters</div>
  )
}


export function Favourites({favourites, onRemoveFavorite}) 
{
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <Modal onOpen={setIsOpen} open={isOpen} title="List of Favourites">
        {favourites.map((character) => (
          <Character key={character.id} character={character}>
            <button className="icon red"onClick={() => onRemoveFavorite(character.id)} >
              <TrashIcon />
            </button>
          </Character>
        ))}
    </Modal>
    <button className="heart" onClick={() => setIsOpen((is) => !is)}>
      <HeartIcon className="icon"/>
      <span className="badge">{favourites.length}</span>
    </button>
    </>
  )
}