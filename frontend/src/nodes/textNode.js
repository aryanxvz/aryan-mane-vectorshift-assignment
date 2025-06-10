import { useState, useEffect, useRef, useCallback } from 'react'
import { BaseNode } from '../components/baseNode'

export const TextNode = ({ id, data, onNodesChange, onEdgesChange }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}')
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 })
  const [previousVariables, setPreviousVariables] = useState([])
  const inputRef = useRef(null)
  
  const extractVariables = useCallback((text) => {
    const regex = /{{([^{}]+)}}/g
    const matches = [...text.matchAll(regex)]
    return matches.map(match => match[1].trim()).filter(Boolean)
  }, [])

  const variables = extractVariables(currText)

  // Process text for display/output (replace variables with actual values if connected)
  const processText = useCallback((text, connectedInputs = {}) => {
    let processedText = text
    variables.forEach(varName => {
      const inputValue = connectedInputs[varName] || `{{${varName}}}`
      processedText = processedText.replace(
        new RegExp(`{{\\s*${varName}\\s*}}`, 'g'), 
        inputValue
      )
    })
    return processedText
  }, [variables])

  // Update node data when text changes
  const updateNodeData = useCallback(() => {
    if (onNodesChange) {
      onNodesChange((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, text: currText } }
            : node
        )
      )
    }
  }, [id, currText, onNodesChange])

  // Auto-connect to matching input nodes
  const autoConnectToInputNodes = useCallback((variables, allNodes) => {
    console.log('=== AUTO-CONNECT DEBUG ===')
    console.log('Variables to connect:', variables)
    console.log('All nodes:', allNodes?.map(n => ({ id: n.id, type: n.type, inputName: n.data?.inputName })))
    console.log('onEdgesChange available:', !!onEdgesChange)
    
    if (!onEdgesChange || !allNodes) {
      console.log('Missing onEdgesChange or allNodes')
      return
    }
    
    variables.forEach(varName => {
      console.log(`\n--- Processing variable: ${varName} ---`)
      
      // Find InputNode with matching name (more flexible matching)
      const matchingInputNode = allNodes.find(node => {
        console.log(`Checking node: ${node.id}, type: ${node.type}, inputName: ${node.data?.inputName}`)
        
        if (node.type !== 'customInput') {
          console.log(`  -> Skipped: not customInput type`)
          return false
        }
        
        // Check multiple matching criteria
        const nodeInputName = node.data?.inputName?.toLowerCase()
        const nodeId = node.id.toLowerCase()
        const searchVar = varName.toLowerCase()
        
        const matches = nodeInputName === searchVar || 
                       nodeId.includes(searchVar) ||
                       nodeInputName?.includes(searchVar)
        
        console.log(`  -> Match check: inputName="${nodeInputName}" vs "${searchVar}" = ${matches}`)
        return matches
      })
      
      if (matchingInputNode) {
        const sourceHandle = `${matchingInputNode.id}-value`
        const targetHandle = `${id}-input-${varName}`
        
        console.log(`✅ Found matching node: ${matchingInputNode.id}`)
        console.log(`Attempting to connect: ${sourceHandle} -> ${targetHandle}`)
        
        // Create the connection
        onEdgesChange((edges) => {
          console.log('Current edges:', edges.length)
          
          const connectionExists = edges.some(edge => 
            edge.source === matchingInputNode.id && 
            edge.target === id && 
            edge.sourceHandle === sourceHandle && 
            edge.targetHandle === targetHandle
          )
          
          if (!connectionExists) {
            const newEdge = {
              id: `${matchingInputNode.id}-to-${id}-${varName}`,
              source: matchingInputNode.id,
              target: id,
              sourceHandle: sourceHandle,
              targetHandle: targetHandle,
              type: 'default',
              animated: true
            }
            console.log('🚀 Creating new edge:', newEdge)
            return [...edges, newEdge]
          } else {
            console.log('⚠️ Connection already exists')
          }
          return edges
        })
      } else {
        console.log(`❌ No matching InputNode found for variable: ${varName}`)
        console.log('Available InputNodes:', allNodes.filter(n => n.type === 'customInput'))
      }
    })
    console.log('=== END AUTO-CONNECT DEBUG ===\n')
  }, [id, onEdgesChange])
  // Handle dynamic input handle creation/removal
  const updateInputHandles = useCallback((variables, allNodes) => {
    const hasChanges = 
      variables.length !== previousVariables.length ||
      variables.some(v => !previousVariables.includes(v)) ||
      previousVariables.some(v => !variables.includes(v))
    
    if (hasChanges && onNodesChange) {
      onNodesChange((nodes) => {
        const updatedNodes = nodes.map((node) => {
          if (node.id === id) {
            const newInputHandles = variables.map(varName => ({
              id: `${id}-input-${varName}`,
              label: varName,
              type: 'target'
            }))
            
            return {
              ...node,
              data: {
                ...node.data,
                inputHandles: newInputHandles,
                variables: variables
              }
            }
          }
          return node
        })
        
        return updatedNodes
      })
      
      // Trigger auto-connection after state update
      setTimeout(() => {
        if (onNodesChange) {
          onNodesChange((currentNodes) => {
            autoConnectToInputNodes(variables, currentNodes)
            return currentNodes
          })
        }
      }, 50)
      
      setPreviousVariables(variables)
    }
  }, [id, previousVariables, onNodesChange, autoConnectToInputNodes])

  // Auto-resize textarea based on content
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

  // Handle text changes and variable detection
  const handleTextChange = useCallback((e) => {
    const newText = e.target.value
    setCurrText(newText)
    
    const newVariables = extractVariables(newText)
    
    // Get current nodes for auto-connection
    if (onNodesChange) {
      onNodesChange((currentNodes) => {
        updateInputHandles(newVariables, currentNodes)
        return currentNodes
      })
    }
    
    updateNodeData()
  }, [extractVariables, updateInputHandles, updateNodeData, onNodesChange])

  // Initialize variables on mount
  useEffect(() => {
    const initialVariables = extractVariables(currText)
    if (onNodesChange) {
      onNodesChange((currentNodes) => {
        updateInputHandles(initialVariables, currentNodes)
        return currentNodes
      })
    }
  }, []) // Only run on mount

  return (
    <BaseNode
      id={id}
      title="Text"
      outputHandles={[{ 
        id: `${id}-output`,
        type: 'source'
      }]}
      inputHandles={variables.map(varName => ({
        id: `${id}-input-${varName}`,
        label: varName,
        type: 'target'
      }))}
      style={{ width: dimensions.width, minHeight: dimensions.height }}
    >
      <div className="flex flex-col h-full space-y-2">
        <label className="text-sm font-medium text-gray-700">Text Content</label>
        <textarea
          ref={inputRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with variables like &#123;&#123;input&#125;&#125; or &#123;&#123;data&#125;&#125;"
          className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none overflow-hidden transition-all"
          style={{ 
            height: dimensions.height - 40,
            minHeight: '40px'
          }}
        />
        
        {variables.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs text-purple-600/80 bg-purple-100/50 px-2 py-1 rounded">
              <span className="font-semibold">Variables detected:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {variables.map(varName => (
                  <span 
                    key={varName} 
                    className="font-mono bg-purple-200/60 px-1 py-0.5 rounded text-purple-800"
                  >
                    {varName}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              💡 Input handles created automatically for each variable
            </div>
          </div>
        )}
        
        {variables.length === 0 && (
          <div className="text-xs text-gray-400 italic">
            {"Type something like {{input}} or {{data}} to create dynamic inputs"}
          </div>
        )}
      </div>
    </BaseNode>
  )
}