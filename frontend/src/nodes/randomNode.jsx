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

      <label>
        Type:
        <select value={randomType} onChange={(e) => setRandomType(e.target.value)}>
          <option value="integer">Integer</option>
          <option value="float">Float</option>
          <option value="boolean">Boolean</option>
        </select>
      </label><br />
      
      {randomType !== 'boolean' && (
        <>
          <label>
            Min:
            <input 
              type="number" 
              value={min} 
              onChange={(e) => setMin(parseFloat(e.target.value))}
            />
          </label><br />
          <label>
            Max:
            <input 
              type="number" 
              value={max} 
              onChange={(e) => setMax(parseFloat(e.target.value))}
            />
          </label>
        </>
      )}

    </BaseNode>
  )
}