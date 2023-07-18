import { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { pokeApi } from "@/api"
import { Pokemon } from "@/interfaces"
import { Layout } from "@/components/layouts/Layout";
import { ls } from "@/utils";

interface Props {
    pokemon: Pokemon;
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState(ls.isInFavorites(pokemon.id))

    const onToggle = () => {
        ls.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)

        if (isInFavorites) return

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }

        })
    }


    return (
        <Layout title={pokemon.name}>
            <Grid.Container gap={2} justify="center" css={{
                marginTop: ".5rem"
            }}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{
                        padding: "2rem"
                    }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image-png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize"> {pokemon.name} </Text>
                            <Button color='gradient' ghost={isInFavorites} onClick={onToggle}>
                                {isInFavorites ? 'Remove from Favs' : 'Add to Favs'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}> Sprites </Text>

                            <Container display="flex" gap={1}>
                                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export default PokemonPage

export const getStaticPaths: GetStaticPaths = async () => {

    const paths = [...Array(151)].map((_, index) => {
        return {
            params: {
                id: (index + 1).toString()
            }
        }
    })

    return {
        paths,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id = '' } = params as { id: string };

    if (id.length === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    const { data, status } = await pokeApi.get<Pokemon>(`/pokemon/${name}`)

    const pokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }
    return {
        props: {
            pokemon
        }
    }
}