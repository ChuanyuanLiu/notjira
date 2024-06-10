import './App.css'
import React from 'react'

function App() {
    const [data, setData] = React.useState("")
    React.useEffect(() => {
        fetch('http://localhost:3000')
            .then((response) => response.json())
            .then((data) => setData(data))
    }, [])

    return <div>
        {data}
    </div>
}

export default App
