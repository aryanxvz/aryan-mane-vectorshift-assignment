import { Handle, Position } from 'reactflow'

export const BaseNode = ({ id, title, children, inputHandles = [], outputHandles = [], style = {} }) => {
  return (
    <div style={{ width: 200, minHeight: 80, border: '1px solid black', padding: 8, ...style }}>

      <div>
        <strong>{title}</strong>
      </div>

      <div style={{ marginTop: 8 }}>
        {children}
      </div>

      {inputHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={handle.style}
        />
      ))}

      {outputHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={handle.style}
        />
      ))}
      
    </div>
  )
}
