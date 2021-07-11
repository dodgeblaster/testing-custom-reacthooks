import { useEffect, useState } from 'react'

const Post = (props) => (
    <div
        key={`${props.userId}-${props.id}`}
        className="px-4 py-2 rounded border border-gray-200 mb-2"
    >
        <p className="font-bold">{props.title}</p>
        <p className="text-xs">{props.body}</p>
    </div>
)

export default function Page() {
    const [state, setState] = useState({
        network: 'loading',
        error: null,
        data: null
    })

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
                setTimeout(() => {
                    setState({
                        network: 'success',
                        error: null,
                        data: json
                    })
                }, 500)
            })
            .catch((err) => {
                setState({
                    network: 'error',
                    error: err.message,
                    data: null
                })
            })
    }, [])

    if (state.network === 'loading') {
        return 'loading...'
    }

    if (state.network === 'error') {
        return 'error...'
    }

    return <div>{state.data.map(Post)}</div>
}
