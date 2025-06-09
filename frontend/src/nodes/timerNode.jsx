import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000)
  const [isRunning, setIsRunning] = useState(false)

  const inputHandles = [
    { id: `${id}-trigger`, style: { top: '25%' } },
    { id: `${id}-reset`, style: { top: '75%' } }
  ]
  const outputHandles = [{ id: `${id}-complete` }]

  const handleStart = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), delay)
  }

  return (
    <BaseNode
      id={id}
      title="Timer"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >

      <label>
        Delay (ms):
        <input 
          type="number" 
          onChange={(e) => setDelay(parseInt(e.target.value))}
        />
      </label><br />

      <button onClick={handleStart} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Start Timer'}
      </button>

    </BaseNode>
  )
}
