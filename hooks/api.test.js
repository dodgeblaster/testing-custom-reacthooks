import {
    render,
    screen,
    waitForElementToBeRemoved
} from '@testing-library/react'
import { useGet } from './api'

/**
 * Mock Fetch
 */
const mock = {
    fetchError: () => {
        global.fetch = jest.fn(() => Promise.reject({ message: 'Mock Error' }))
    },

    fetchSuccess: () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(['Note 1', 'Note 2', 'Note 3'])
            })
        )
    }
}

/**
 * Test Component to mount the useGet hook into
 */
function TestComponent() {
    const { loading, data, error } = useGet('example.com')

    if (error) {
        return <p>{error}</p>
    }

    if (loading) {
        return <p>Loading</p>
    }

    return (
        <div>
            {data.map((x) => (
                <p key={x}>{x}</p>
            ))}
        </div>
    )
}

test('useGet initializes with loading and returns error properly', async () => {
    mock.fetchError()
    render(<TestComponent />)
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
    screen.getByText(/Mock Error/i)
})

test('useGet initializes with loading and will set data if fetch was successful', async () => {
    mock.fetchSuccess()
    render(<TestComponent />)
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
    screen.getByText(/Note 1/i)
    screen.getByText(/Note 2/i)
    screen.getByText(/Note 3/i)
})
