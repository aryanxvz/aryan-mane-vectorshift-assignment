import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { BackgroundEffects } from './components/backgroundEffects';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

function App() {
  const { nodes, edges } = useStore(selector, shallow);

  return (
    <main className='flex-1 overflow-y-auto bg-gray-50 ml-0'>

      <div className='h-screen bg-gradient-to-br from-indigo-50/70 via-purple-50/70 to-pink-50/70 relative overflow-hidden'>
        <BackgroundEffects />
        
        <div className='absolute inset-0 z-0'>
          <PipelineUI />
        </div>
        <div className='relative z-10'>
          <PipelineToolbar />
        </div>
        <div className='fixed bottom-6 left-0 right-0 z-10'>
          <SubmitButton nodes={nodes} edges={edges} />
        </div>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          margin: "0.5rem",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      />

    </main>
  );
}

export default App;