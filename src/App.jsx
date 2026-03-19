import { useState, useEffect } from 'react';
import { questions } from './questions.js';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 });
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);

  const handleAnswer = (house) => {
    setScore((prev) => ({ ...prev, [house]: prev[house] + 1 }));
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const getWinner = () => {
    return Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
  };

  useEffect(() => {
    if (showResult && isCalculating) {
      const timer = setTimeout(() => setIsCalculating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCalculating]);

  // 1. START SCREEN
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-5xl font-bold text-yellow-500 mb-6 text-center drop-shadow-lg italic">Hogwarts Sorting Hat 🧙‍♂️</h1>
        <p className="text-slate-400 mb-8 text-center max-w-sm">Step forward and let the Hat decide your true destiny...</p>
        <button onClick={() => setStarted(true)} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-110 shadow-2xl border-b-4 border-yellow-800">
          Begin the Ceremony
        </button>
      </div>
    );
  }

  // 2. LOADING / AD SCREEN
  // 2. LOADING / AD SCREEN
  // 2. LOADING / AD SCREEN
  if (showResult && isCalculating) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4 text-center">
        {/* --- ეს ნაწილი ციმციმებს (Thoughts & Loader) --- */}
        <div className="animate-pulse mb-10 flex flex-col items-center">
          <h2 className="text-2xl mb-4 text-slate-400 font-mono italic text-sm">"Hmm, difficult... very difficult..."</h2>
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[10px] text-yellow-500 uppercase tracking-widest italic">Sorting hat is making the final decision...</p>
        </div>

        {/* --- ეს ნაწილი მყარადაა (Sponsored Content) --- */}
        <div className="p-6 bg-slate-800 rounded-2xl border border-yellow-500/20 max-w-xs shadow-2xl relative z-50">
          <p className="font-bold tracking-widest text-[9px] mb-3 text-yellow-500 uppercase opacity-60">Sponsored Magic</p>
          <div className="w-full h-24 bg-slate-700 rounded-xl mb-3 flex items-center justify-center overflow-hidden border border-slate-600">
            <span className="text-4xl hover:scale-110 transition-transform">🪄</span>
          </div>
          <p className="text-xs mb-3 font-medium">Need your own Magic Wand? Get the best deals on Amazon!</p>
          {/* რეალური, "კლიკებადი" ღილაკი */}
          <a
            href="https://www.amazon.com/s?k=harry+potter+wand&tag=YOUR_TAG" // აქ მერე შენს აფილიატ ლინკს ჩასვამ
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            Check Price ✨
          </a>
        </div>
      </div>
    );
  }
  // 3. RESULT SCREEN
  if (showResult && !isCalculating) {
    const winner = getWinner();
    const houseData = {
      Gryffindor: { color: 'text-red-500', desc: 'Bravery, helping others, and chivalry. You are a true lion!', icon: '🦁' },
      Slytherin: { color: 'text-green-500', desc: 'Ambition, cunning, and resourcefulness. You will lead them all!', icon: '🐍' },
      Ravenclaw: { color: 'text-blue-500', desc: 'Intelligence, knowledge, and wit. A true seeker of truth!', icon: '🦅' },
      Hufflepuff: { color: 'text-yellow-400', desc: 'Loyalty, patience, and hard work. A friend you can always count on!', icon: '🦡' }
    };

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border-2 border-yellow-500/10 max-w-md w-full">
          <div className="text-6xl mb-4">{houseData[winner].icon}</div>
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-2">The Sorting Hat says</h2>
          <h1 className={`text-6xl font-black mb-4 uppercase drop-shadow-lg ${houseData[winner].color}`}>{winner}!</h1>
          <p className="text-slate-300 mb-8 italic text-sm px-4">"{houseData[winner].desc}"</p>

          <div className="flex flex-col gap-3 w-full mb-8">
            <a
              href="https://ko-fi.com/avtandilabuashvili44"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#29abe0] text-white px-5 py-2 rounded-full font-bold hover:bg-[#2395c4] transition-all shadow-lg"
            >
              ☕ Support me on Ko-fi
            </a>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')} className="bg-[#1877F2] p-3 rounded-xl hover:opacity-80 transition-all font-bold text-xs">FB</button>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=I'm a ${winner}!&url=${window.location.href}`, '_blank')} className="bg-black p-3 rounded-xl hover:opacity-80 transition-all font-bold text-xs">X</button>
              <button onClick={() => window.open(`https://www.reddit.com/submit?url=${window.location.href}&title=I got ${winner}!`, '_blank')} className="bg-[#FF4500] p-3 rounded-xl hover:opacity-80 transition-all font-bold text-xs">RD</button>
              <button onClick={() => alert('Screenshot and share on Story!')} className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-3 rounded-xl hover:opacity-80 transition-all font-bold text-xs">IG</button>
            </div>
          </div>

          <button onClick={() => window.location.reload()} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg text-sm">
            Retake Ceremony
          </button>
        </div>
      </div>
    );
  }

  // 4. QUESTIONS SCREEN
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-lg w-full bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-yellow-500 font-mono text-[10px] uppercase tracking-widest">Hogwarts Sorting Quiz</span>
          <span className="text-slate-500 text-[10px]">{currentQuestion + 1} / {questions.length}</span>
        </div>

        <div className="w-full h-44 mb-6 overflow-hidden rounded-2xl shadow-inner border border-slate-700/50">
          <img src={questions[currentQuestion].image} alt="magic" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-xl font-bold mb-6 leading-tight px-2">{questions[currentQuestion].question}</h2>

        <div className="grid grid-cols-1 gap-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option.house)} className="w-full text-left p-4 rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-yellow-500 transition-all duration-300 text-sm group">
              <span className="group-hover:translate-x-1 inline-block transition-transform">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;