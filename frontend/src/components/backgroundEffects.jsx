export const BackgroundEffects = () => (
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400/20 to-blue-400/20
                   animate-[pulse_3s_ease-in-out_infinite]"/>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl 
                   animate-[bounce_4s_ease-in-out_infinite]"/>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl 
                   animate-[bounce_6s_ease-in-out_infinite] [animation-delay:2s]"/>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl 
                   animate-[bounce_5s_ease-in-out_infinite] [animation-delay:1s]"/>
  </div>
);