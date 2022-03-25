import Container from '@mui/material/Container';
import Link from 'next/link'

export default function tnc() {

    return (
        <>
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
