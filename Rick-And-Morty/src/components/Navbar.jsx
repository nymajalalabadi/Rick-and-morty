import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({children}) {
  return (
    <div className="navbar">
      <Logo />
      {children}
      <Favourites />
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

function Favourites() {
  return (
    <button className="heart">
      <HeartIcon className="icon"/>
      <span className="badge">4</span>
    </button>
  )
}