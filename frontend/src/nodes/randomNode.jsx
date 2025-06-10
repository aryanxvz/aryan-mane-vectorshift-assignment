import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const RandomNode = ({ id, data }) => {
  const [min, setMin] = useState(data?.min || 0)
  const [max, setMax] = useState(data?.max || 100)
  const [randomType, setRandomType] = useState(data?.randomType || 'integer')

  const outputHandles = [{ id: `${id}-value` }]

  return (
    <BaseNode
      id={id}
      title="Random"
      outputHandles={outputHandles}
    >
      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label>Type</label>
          <select
            value={randomType}
            onChange={(e) => setRandomType(e.target.value)}
            className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent appearance-none"
          >
            <option value="integer">Integer</option>
            <option value="float">Float</option>
            <option value="boolean">Boolean</option>
          </select>
        </div>

        {randomType !== 'boolean' && (
          <div className="space-y-3">
            <div className="flex flex-col space-y-1">
              <label>Min Value</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(parseFloat(e.target.value))}
                className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label>Max Value</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(parseFloat(e.target.value))}
                className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  )
}