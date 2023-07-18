import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../ui/Navbar";

interface Props {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const Layout: FC<Props> = ({ title, description, children }) => {
    const formatTitle = (str: string) => str.toLocaleLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return (
        <>
            <Head>
                <title>{formatTitle(title)}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main style={{
                padding: '0 1rem',
            }}>
                {children}
            </main>
        </>
    )
}
