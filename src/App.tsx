import { useState } from 'react'
import { Button } from './components/Button/Button'
import { env } from './env'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">{env.VITE_APP_NAME}</h1>
      <p className="text-gray-600">Clicked {count} times</p>
      <Button label="Click me" onClick={() => setCount((c) => c + 1)} />
    </main>
  )
}

export default App
