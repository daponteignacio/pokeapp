import { FC } from 'react'
import { Card, Row, Text } from '@nextui-org/react'
import { SmallPokemon } from '@/interfaces'
import { useRouter } from 'next/router'

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon: { id, name, image } }) => {
    const { push } = useRouter()

    return (
        <Card hoverable clickable onClick={() => push(`/pokemon/${id}`)}>
            <Card.Body>
                <Card.Image
                    src={image}
                    width='100%'
                    height={140}
                />
            </Card.Body>
            {name && (
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text transform='capitalize'>{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            )}

        </Card>
    )
}
