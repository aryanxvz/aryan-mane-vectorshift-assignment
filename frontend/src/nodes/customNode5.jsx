import { BaseNode } from '../components/baseNode'

export const CustomNode5 = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Custom 5"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <p>Custom node 5</p>
    </BaseNode>
  )
}