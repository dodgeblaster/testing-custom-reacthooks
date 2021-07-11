import { useGet } from '../hooks/api'

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
    const { data, loading, error } = useGet(
        'https://jsonplaceholder.typicode.com/posts'
    )

    if (loading) {
        return 'loading...'
    }

    if (error) {
        return error
    }

    return <div>{data.map(Post)}</div>
}
