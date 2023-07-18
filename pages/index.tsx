import { pokeApi } from '@/api'
import { Layout } from '@/components/layouts/Layout'
import { PokemonList } from '@/components/pokemon/PokemonList'
import { PokemonListResponse, SmallPokemon } from '@/interfaces'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  pokemons: SmallPokemon[]
}

export const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Home" description="Home page">
      <PokemonList pokemons={pokemons} />
    </Layout>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const resp = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons = resp.data.results.map((pokemon, index) => ({
    name: pokemon.name,
    url: pokemon.url,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  }))

  return {
    props: {
      pokemons
    }
  }
}
