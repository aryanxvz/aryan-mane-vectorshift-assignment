import { useState } from 'react'
import { BaseNode } from '../components/baseNode'

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'))
  const [inputType, setInputType] = useState(data.inputType || 'Text')

  return (
    <BaseNode
      id={id}
      title="Input"
      outputHandles={[{ id: `${id}-value` }]}
    >
      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label>Field Name</label>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
            placeholder="Enter field name"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Input Type</label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="bg-white/20 border border-gray-300/30 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent appearance-none"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  )
}