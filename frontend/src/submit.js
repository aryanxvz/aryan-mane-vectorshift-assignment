// submit.js

export const SubmitButton = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <button type="submit" className="relative inline-flex h-10 bg-gray-50 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white hover:shadow-lg hover:bg-white transition-all duration-300">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-50 px-4 text-sm font-medium text-purple-700 backdrop-blur-3xl transition-colors">
          Submit
        </span>
      </button>
    </div>
  );
}