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
			<body className={`${inter.className} border-8 border-emerald-800 min-h-[100cqh]`} >
				<div className="border-yellow-400 border-2 w-[90%] mx-auto flex flex-col flex-1 min-h-[100cqh] justify-between">
					<header className="border-2 border-black">
						<div className="headercontent">Header</div>
					</header>
					<main className="border-2 border-blue-700 flex justify-center grow">
						<div className="contentwrapper border-8 border-orange-500 flex flex-col items-center">
							{children}
						</div>
					</main>
					<footer className=" w-full">
						<div className="footercontent flex justify-around border-2 border-slate-800">
							<div className="w-80 h-8 border-white border-2">Footer stuff</div>
							<div className="w-80 h-8 border-white border-2">Footer things</div>
							<div className="w-80 h-8 border-white border-2">Oh my GOD what is THAT!!!?!?</div>
						</div>
					</footer>
					{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
				</div>
			</body>
		</html >
	)
}
