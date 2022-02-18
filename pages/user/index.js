import Table from "../../components/table"
import Navigator from "../../components/navigator"
import Container from '@mui/material/Container';
import Link from 'next/link'
import Button from '@mui/material/Button';


export default function User() {

    return (
        <>
        <Navigator />
        <Container maxWidth="md" className="grid justify-center">
        <div className="max-w-sm w-full lg:max-w-full lg:flex py-10">
            <div 
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
            style={{
                backgroundImage: "url('https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg')"
            }}
            title="Woman holding a mug">
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">Your name here</div>
                <p className="text-gray-700 text-base">quick description</p>
                </div>
                <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="Avatar"></img>
                <div className="text-sm">
                    <Link href="/upload"><Button variant='contained' className='bg-gray'>Upload Sounds</Button></Link>
                </div>
                </div>
            </div>
        </div>
        </Container>
        <Table />
        </>
    )
}