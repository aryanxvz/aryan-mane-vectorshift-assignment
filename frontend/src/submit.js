import React from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { toast } from 'react-toastify';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  
  const handleSubmit = async () => {
    // Show loading toast
    const toastId = toast.loading('Analyzing pipeline...');
    
    try {
      // Basic validation
      if (nodes.length === 0) {
        toast.update(toastId, {
          render: 'Please add at least one node to the pipeline',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Success notification
      toast.update(toastId, {
        render: (
          <div>
            <h4 className="font-bold">Pipeline Analysis Complete</h4>
            <ul className="list-disc pl-5 mt-1">
              <li>Nodes: {data.num_nodes}</li>
              <li>Edges: {data.num_edges}</li>
              {data.num_edges === 0 ? (
                <li className="text-blue-600">No connections (technically a DAG)</li>
              ) : (
                <li className={data.is_dag ? 'text-white font-semibold' : 'text-red-600'}>
                  {data.is_dag ? 'Valid DAG' : 'Not a valid DAG (contains cycles)'}
                </li>
              )}
            </ul>
            {data.num_edges === 0 && (
              <p className="mt-2 text-blue-600">
                Note: While technically a DAG, your pipeline has no connections between nodes.
              </p>
            )}
          </div>
        ),
        type: data.is_dag ? 'success' : 'warning',
        isLoading: false,
        autoClose: 5000,
      });
      
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      toast.update(toastId, {
        render: `Error submitting pipeline: ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <button 
        onClick={handleSubmit}
        className="relative inline-flex h-10 bg-gray-50 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white hover:shadow-lg hover:bg-white transition-all duration-300"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-50 px-4 text-sm font-medium text-purple-700 backdrop-blur-3xl transition-colors">
          Submit Pipeline
        </span>
      </button>
    </div>
  );
}