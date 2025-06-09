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
      <label>
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
        </select>
      </label>
    </BaseNode>
  )
}
