import { Handle, Position, useStore } from 'reactflow'

export const BaseNode = ({ id, title, children, inputHandles = [], outputHandles = [], style = {} }) => {
  const edges = useStore((store) => store.edges)
  
  const isHandleConnected = (handleId) => {
    return edges.some(edge => 
      edge.sourceHandle === handleId || edge.targetHandle === handleId
    )
  }

  return (
    <div className='w-56 bg-white/80 backdrop-blur-sm border-2 border-purple-200/70 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30  hover:border-purple-300/90 transition-all duration-300 cursor-move' style={style}>
      <div className='flex items-center mb-3'>
        <span className='text-gray-900 font-semibold'>{title}</span>
      </div>

      <div className='text-gray-700 text-sm mb-3'>
        {children}
      </div>

      {inputHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          className={`w-4 h-4 !bg-teal-500 transition-all duration-300 ${
            isHandleConnected(handle.id) 
              ? '!opacity-100 ring-[3px] ring-teal-400/80 shadow-lg' 
              : '!opacity-90 ring-[2px] ring-teal-500/70 hover:ring-3 hover:ring-teal-500/50'
          }`}
          style={{
            ...handle.style,
            transform: isHandleConnected(handle.id) ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      ))}

      {outputHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          className={`w-4 h-4 !bg-purple-500 transition-all duration-300 ${
            isHandleConnected(handle.id) 
              ? '!opacity-100 ring-[3px] ring-purple-400/70 shadow-lg' 
              : '!opacity-90 ring-[2px] ring-purple-400/60 hover:ring-3 hover:ring-purple-400/50'
          }`}
          style={{
            ...handle.style,
            transform: isHandleConnected(handle.id) ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  )
}