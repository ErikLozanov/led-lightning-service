function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold mb-4 text-neon-blue drop-shadow-[0_0_10px_rgba(0,243,255,0.7)]">
        LED Lightning Service
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl">
        Professional headlight restoration and custom lighting solutions.
        See the road clearly again.
      </p>
      
      <button className="mt-8 px-6 py-3 bg-neon-blue text-black font-bold rounded hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300">
        Get a Quote
      </button>
    </div>
  )
}

export default App