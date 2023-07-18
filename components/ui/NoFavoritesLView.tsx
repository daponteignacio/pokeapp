import { Container, Text } from '@nextui-org/react'

export const NoFavoritesLView = () => {
    return (
        <Container css={{
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(100vh-100px)',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
        }}>
            <Text h1>No hay favoritos</Text>
        </Container>)
}
