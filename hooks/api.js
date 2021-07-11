import { useEffect, useState } from 'react'

export const useGet = (url) => {
    const [state, setState] = useState({
        network: 'loading',
        error: null,
        data: null
    })

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setState({
                    network: 'success',
                    error: null,
                    data: json
                })
            })
            .catch((err) => {
                setState({
                    network: 'error',
                    error: err.message,
                    data: null
                })
            })
    }, [])

    return {
        data: state.data,
        loading: state.network === 'loading',
        error: state.network === 'error' && state.error
    }
}
