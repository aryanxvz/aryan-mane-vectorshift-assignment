import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'))
  const [outputType, setOutputType] = useState(data.outputType || 'Text')

  return (
    <BaseNode
      id={id}
      title="Output"
      inputHandles={[{ 
        id: `${id}-value`,
        style: { top: '50%' }
      }]}
    >

      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label>Output Name</label>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all"
            placeholder="Enter output name"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Output Type</label>
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent appearance-none transition-all"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
      
    </BaseNode>
  )
}