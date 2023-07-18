import { inClient } from "./inClient";

export const getFavorites = (): number[] => {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

export const toggleFavorite = (id: number) => {
    if (typeof window === 'undefined') return

    let favorites: number[] = getFavorites()

    if (favorites.includes(id)) favorites = favorites.filter(fav => fav !== id);
    else favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const isInFavorites = (id: number): boolean => {
    if (typeof window === 'undefined') return false

    const favorites = getFavorites()

    if (favorites.includes(id)) return true;
    return false
}
