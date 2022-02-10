import Image from 'next/image'

export default function Footer() {

    return(
        <footer
        className='w-full bg-gray-800 p-10 grid'
        >
        <div
        className='max-w-7xl mx-auto sm:px-6 lg:px-8'
        >
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Samplified Copyright 2022
          </a>
        </div>

        </footer>
    )

}