/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
			},
			{
				protocol: 'https',
				hostname: 'i.insider.com',
			},
		]
	}
}

module.exports = nextConfig
