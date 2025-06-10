import { BaseNode } from '../components/baseNode';

export const CustomNode4 = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Custom 4"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <p>Custom node 4</p>
    </BaseNode>
  );
};
