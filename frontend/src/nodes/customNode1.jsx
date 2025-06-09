import { BaseNode } from '../components/baseNode';

export const CustomNode1 = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Custom 1"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <p>Custom node 1</p>
    </BaseNode>
  );
};
