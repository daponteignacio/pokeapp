import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemonInfo = async (value: string) => {
    try {
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${value}`)
        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }
    } catch (error) {

    }
}