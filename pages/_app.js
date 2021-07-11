import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
    return (
        <div className="container mx-auto px-4 max-w-4xl mt-10">
            <h1 className="font-bold text-gray-400 text-4xl mb-4">
                News Stories
            </h1>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
