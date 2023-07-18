import { useEffect, useState } from "react"
import { Layout } from "@/components/layouts/Layout"
import { PokemonList } from "@/components/pokemon/PokemonList"
import { NoFavoritesLView } from "@/components/ui/NoFavoritesLView"
import { SmallPokemon } from "@/interfaces"
import { ls } from "@/utils"

const Favorites = () => {

    const [favoritePokemonsIds, setFavoritePokemonsIds] = useState<number[]>([])
    const [pokemons, setPokemons] = useState<SmallPokemon[]>([])

    useEffect(() => {
        setFavoritePokemonsIds(ls.getFavorites())
    }, [])

    useEffect(() => {
        setPokemons(favoritePokemonsIds.map(id => ({
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        })))
    }, [favoritePokemonsIds])


    return (
        <Layout title="Favorritos">
            {
                pokemons.length === 0
                    ? <NoFavoritesLView />
                    : <PokemonList pokemons={pokemons} />
            }
        </Layout>
    )
}

export default Favorites