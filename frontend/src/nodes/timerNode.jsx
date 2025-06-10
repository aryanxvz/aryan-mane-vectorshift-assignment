import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000)
  const [isRunning, setIsRunning] = useState(false)

  const outputHandles = [{ id: `${id}-complete` }]

  const handleStart = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), delay)
  }

  return (
    <BaseNode
      id={id}
      title="Timer"
      outputHandles={outputHandles}
    >
      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label>Delay (ms)</label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
            min="0"
          />
        </div>
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`w-full py-1.5 px-3 rounded-lg border text-sm font-medium transition-all ${
            isRunning 
              ? 'bg-blue-400/30 text-blue-700/70 border-blue-300/30 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500/50 shadow-sm hover:shadow-md'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center justify-center">
              <span className="animate-pulse mr-2"></span> Running...
            </span>
          ) : (
            'Start Timer'
          )}
        </button>
      </div>
    </BaseNode>
  )
}