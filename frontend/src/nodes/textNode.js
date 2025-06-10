import { useState, useEffect, useRef } from 'react'
import { BaseNode } from '../components/baseNode'

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}')
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 })
  const inputRef = useRef(null)
  
  const extractVariables = (text) => {
    const regex = /{{([^{}]+)}}/g
    const matches = [...text.matchAll(regex)]
    return matches.map(match => match[1].trim()).filter(Boolean)
  }

  useEffect(() => {
    if (inputRef.current) {
      const newWidth = Math.min(Math.max(currText.length * 8 + 40, 200), 400)
      const textarea = inputRef.current
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const baseHeight = 80
      const minTextareaHeight = 40 
      const contentExtraHeight = Math.max(scrollHeight - minTextareaHeight, 0)
      const newHeight = baseHeight + contentExtraHeight
      
      setDimensions({
        width: newWidth,
        height: newHeight
      })
    }
  }, [currText])

  const variables = extractVariables(currText)

  return (
    <BaseNode
      id={id}
      title="Text"
      outputHandles={[{ id: `${id}-output` }]}
      inputHandles={variables.map(varName => ({
        id: `${id}-input-${varName}`,
        label: varName
      }))}
      style={{ width: dimensions.width, minHeight: dimensions.height }}
    >
      <div className="flex flex-col h-full space-y-2">
        <label>Text Content</label>
        <textarea
          ref={inputRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none overflow-hidden transition-all"
          style={{ 
            height: dimensions.height - 40,
            minHeight: '40px'
          }}
        />
        {variables.length > 0 && (
          <div className="text-xs text-purple-600/80 bg-purple-100/50 px-2 py-1 rounded">
            Variables: <span className="font-mono">{variables.join(', ')}</span>
          </div>
        )}
      </div>
    </BaseNode>
  )
}