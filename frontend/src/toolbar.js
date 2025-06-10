// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className='p-3 flex justify-center items-center'>
            <div className='flex flex-wrap gap-3 backdrop-blur-lg rounded-xl py-2'>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='random' label='Random' />
                <DraggableNode type='custom4' label='Custom 4' />
                <DraggableNode type='custom5' label='Custom 5' />
            </div>
        </div>
    );
};