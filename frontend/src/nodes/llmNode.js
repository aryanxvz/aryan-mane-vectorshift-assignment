import { BaseNode } from '../components/baseNode'

export const LLMNode = ({ id }) => {
  const inputHandles = [
    { id: `${id}-system`, style: { top: '33%' } },
    { id: `${id}-prompt`, style: { top: '66%' } }
  ]
  const outputHandles = [{ id: `${id}-response` }]

  return (
    <BaseNode
      id={id}
      title="LLM"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <p>This is an LLM node.</p>
    </BaseNode>
  )
}