import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'))
  const [inputType, setInputType] = useState(data.inputType || 'Text')

  return (
    <BaseNode
      id={id}
      title="Input"
      outputHandles={[{ id: `${id}-value` }]}
    >

      <label>
        Name:<input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </label><br />
      
      <label>
        Type:
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
      
    </BaseNode>
  )
}
