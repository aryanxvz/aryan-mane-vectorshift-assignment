import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add')
  const inputHandles = [
    { id: `${id}-a`, style: { top: '25%' } },
    { id: `${id}-b`, style: { top: '75%' } }
  ]
  const outputHandles = [{ id: `${id}-result` }]

  return (
    <BaseNode
      id={id}
      title="Math"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div className="flex flex-col space-y-1">
        <label>Operation</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent appearance-none"
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
        </select>
      </div>
    </BaseNode>
  )
}