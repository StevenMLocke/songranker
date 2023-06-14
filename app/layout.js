import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Song Ranker',
	description: 'Put an artist\'s songs in the order that you think is the best.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="light">
			<body className={`${inter.className} min-h-[100cqmax]`} >
				<div className=" lg:w-[90%] mx-auto flex flex-col justify-between border-box min-h-[100cqh]">
					<header className="border-b-2 border-black">
						<div className="headercontent bg-neutral-400">Header</div>
					</header>
					<main className="flex flex-1 justify-center box-border">
						<div className="contentwrapper  max-w-[100cqw] box-border flex flex-col items-center gap-4 my-2">
							{children}
						</div>
					</main>
					<footer className=" w-full flex justify-around border-t-2 border-black gap-2 p-1">
						<div className="w-80 bg-neutral-400 p-1">Footer stuff</div>
						<div className="w-80 bg-neutral-400 p-1">Footer things</div>
						<div className="w-80 bg-neutral-400 p-1">Oh my GOD what is THAT!!!?!?</div>
					</footer>
					{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
				</div>
			</body>
		</html >
	)
}
