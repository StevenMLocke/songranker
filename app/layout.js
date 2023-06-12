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
			<body className={inter.className}>
				<div className=" border-purple-400 h-screen w-[90%] mx-auto flex flex-col justify-between">
					<header className="h-[5%] border-2 border-black">
						<div className="headercontent">Header</div>
					</header>
					<main className="border-2 border-blue-700 flex h-full">
						<div className="contentwrapper border-8 border-orange-500 flex flex-col flex-1 items-center">
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
		</html>
	)
}
