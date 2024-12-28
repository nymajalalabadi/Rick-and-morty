import { useEffect, useState } from "react";

export default function useLocalStroge() {
    const [favourites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("FAVORITES")) || []);

    useEffect(() => {
        localStorage.setItem("FAVORITES", JSON.stringify(favourites));
    }, [favourites])

    return [favourites, setFavorites];
}