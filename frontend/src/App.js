import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <main className='flex-1 overflow-y-auto bg-gray-50 ml-0'>
      <div className='h-screen bg-gradient-to-br from-indigo-50/70 via-purple-50/70 to-pink-50/70 relative overflow-hidden'>

        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400/20 to-blue-400/20
                         animate-[pulse_3s_ease-in-out_infinite]'/>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl 
                         animate-[bounce_4s_ease-in-out_infinite]'/>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl 
                         animate-[bounce_6s_ease-in-out_infinite] [animation-delay:2s]'/>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl 
                         animate-[bounce_5s_ease-in-out_infinite] [animation-delay:1s]'/>
        </div>

        <div className='absolute inset-0 z-0'>
          <PipelineUI />
        </div>
        <div className='relative z-10'>
          <PipelineToolbar />
        </div>
        <div className='fixed bottom-6 left-0 right-0 z-10'>
          <SubmitButton />
        </div>
      </div>
    </main>
  );
}

export default App;