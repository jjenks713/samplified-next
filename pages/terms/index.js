import Container from '@mui/material/Container';
import Link from 'next/link'
import Head from 'next/head'

export default function tnc() {

    return (
        <>
        <Head>
            <title>Samplified</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/head-logo.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet"></link>
        </Head>
        <Container maxWidth="md" className="grid justify-center pt-24">
            <div className="position absolute top-3 right-8 font-bold">
                <Link href="/upload">X</Link>
            </div> 
            <div className='grid justify-center'>
                <div className='text-center pb-8 text-xl'>Terms and Conditions</div>
                <embed src="tnc.pdf" width="800px" height="2100px" />
            </div>
        </Container>
        </>
    )
}
