// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className={`
        bg-gray-50/90 hover:bg-white
        border border-purple-500/70
        w-24 h-10 
        flex items-center justify-center
        rounded-lg
        cursor-grab active:cursor-grabbing
        shadow-sm hover:shadow-md hover:shadow-purple-500/20
        select-none
        transition-all duration-200
        transform hover:scale-105 active:scale-95
        group
        text-gray-900
      `}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className='flex items-center gap-2'>
        {icon && (
          <span className='text-sm opacity-80 group-hover:opacity-100 transition-opacity'>
            {icon}
          </span>
        )}
        <span className='text-sm font-medium text-center'>
          {label}
        </span>
      </div>
    </div>
  )
}