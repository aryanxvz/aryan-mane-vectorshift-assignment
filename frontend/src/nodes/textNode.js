import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}')

  return (
    <BaseNode
      id={id}
      title="Text"
      outputHandles={[{ id: `${id}-output` }]}
    >
      <label>
        Text:<input type="text" value={currText} onChange={(e) => setCurrText(e.target.value)} />
      </label>
    </BaseNode>
  )
}
