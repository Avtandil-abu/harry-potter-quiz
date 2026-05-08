import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// შემოგვაქვს შენი გადმოწერილი სურათი ფონისთვის
import hogwartsBg from './bg.jpg';

const questions = [
  {
    question: "A mysterious fog surrounds you in the Forbidden Forest. You see four paths. Which do you take?",
    image: "https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?auto=format&fit=crop&q=80&w=800",
    options: [
      { text: "The path illuminated by a soft, ancient blue glow.", house: "Ravenclaw" },
      { text: "The path where you hear a friend's voice calling for help.", house: "Hufflepuff" },
      { text: "The darkest path – it's the quickest way through.", house: "Slytherin" },
      { text: "The path with the most obstacles, leading to a bright clearing.", house: "Gryffindor" }
    ]
  },
  {
    question: "You find an ancient book that promises to reveal one truth. What do you ask?",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    options: [
      { text: "How can I achieve greatness and leave a legacy?", house: "Slytherin" },
      { text: "How can I protect the ones I love from any harm?", house: "Hufflepuff" },
      { text: "What is the hidden meaning of the universe?", house: "Ravenclaw" },
      { text: "How can I find the courage to face my greatest fear?", house: "Gryffindor" }
    ]
  },
  {
    question: "A bridge you need to cross is guarded by a Troll. He demands a toll. What is your move?",
    image: "https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=800",
    options: [
      { text: "Challenge the Troll to a fair duel.", house: "Gryffindor" },
      { text: "Trick the Troll into letting you pass for free.", house: "Slytherin" },
      { text: "Offer the Troll your sandwich and have a chat.", house: "Hufflepuff" },
      { text: "Find a way to outsmart the Troll using a riddle.", house: "Ravenclaw" }
    ]
  },
  {
    question: "Which of these magical artifacts appeals to your soul the most?",
    image: "https://images.unsplash.com/photo-1547919307-1ecb10702e6f?auto=format&fit=crop&q=80&w=800",
    options: [
      { text: "A ring that grants you influence over others.", house: "Slytherin" },
      { text: "A mirror that shows your happiest memories.", house: "Hufflepuff" },
      { text: "A sword that never blunts in battle.", house: "Gryffindor" },
      { text: "An hourglass that shows the flow of time.", house: "Ravenclaw" }
    ]
  },
  {
    question: "If you could brew a potion that would grant you one thing, it would be:",
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=800",
    options: [
      { text: "Clarity of mind.", house: "Ravenclaw" },
      { text: "Unyielding loyalty.", house: "Hufflepuff" },
      { text: "Limitless ambition.", house: "Slytherin" },
      { text: "Pure adrenaline.", house: "Gryffindor" }
    ]
  },
  {
    question: "You find a lost wallet full of Galleons in the hallway. No one is looking. What do you do?",
    image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
    options: [
      { text: "Take it – it's a gift from fate for my future goals.", house: "Slytherin" },
      { text: "Hand it to a teacher immediately.", house: "Hufflepuff" },
      { text: "Look for the owner yourself; it's the right thing to do.", house: "Gryffindor" },
      { text: "Analyze the contents to find a clue about the owner.", house: "Ravenclaw" }
    ]
  },
  {
    question: "A Dementor is approaching! What memory do you use for your Patronus?",
    image: "https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=800",
    options: [
      { text: "The day you achieved a long-awaited victory.", house: "Slytherin" },
      { text: "A quiet dinner with your closest friends.", house: "Hufflepuff" },
      { text: "The moment you finally understood a complex truth.", house: "Ravenclaw" },
      { text: "The time you stood up for someone weaker than you.", house: "Gryffindor" }
    ]
  },
  {
    question: "Which of these legendary creatures would you like as a companion?",
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800",
    options: [
      { text: "A Phoenix – loyal and immortal.", house: "Gryffindor" },
      { text: "A Dragon – powerful and feared.", house: "Slytherin" },
      { text: "An Owl – wise and silent.", house: "Ravenclaw" },
      { text: "A House-elf – helpful and kind.", house: "Hufflepuff" }
    ]
  },
  {
    question: "You are in the Room of Requirement. What does it become for you?",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800",
    options: [
      { text: "A library with every book ever written.", house: "Ravenclaw" },
      { text: "A training ground to master your skills.", house: "Gryffindor" },
      { text: "A secret headquarters to plan your rise to power.", house: "Slytherin" },
      { text: "A cozy room with a warm fireplace and snacks.", house: "Hufflepuff" }
    ]
  },
  {
    question: "The Sorting Hat is on your head. You can whisper one thing to it. What is it?",
    image: "https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=800",
    options: [
      { text: "Put me where I can prove my worth.", house: "Gryffindor" },
      { text: "Put me where I will find true friends.", house: "Hufflepuff" },
      { text: "Put me where I can learn the most.", house: "Ravenclaw" },
      { text: "Put me where I can reach my full potential.", house: "Slytherin" }
    ]
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 });
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);
  const [userName, setUserName] = useState("");

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

  const generateIDCard = (house) => {
    if (!userName.trim()) return alert("Please enter your name first!");
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800; canvas.height = 500;

    const theme = {
      Gryffindor: { main: "#740001", accent: "#EEBA30", emoji: "🦁" },
      Slytherin: { main: "#1A472A", accent: "#AAAAAA", emoji: "🐍" },
      Ravenclaw: { main: "#0E1A40", accent: "#946B2D", emoji: "🦅" },
      Hufflepuff: { main: "#ECB939", accent: "#000000", emoji: "🦡" }
    }[house];

    ctx.fillStyle = theme.main;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 20;
    ctx.strokeRect(30, 30, 740, 440);

    ctx.fillStyle = theme.accent;
    ctx.textAlign = "center";
    ctx.font = "bold 22px Georgia";
    ctx.fillText("HOGWARTS SCHOOL OF WITCHCRAFT AND WIZARDRY", 400, 90);

    ctx.fillStyle = "white";
    ctx.font = "italic 20px Georgia";
    ctx.fillText("This official certificate confirms that", 400, 160);

    ctx.font = "bold 45px Georgia";
    ctx.fillText(userName.toUpperCase(), 400, 230);

    ctx.font = "italic 20px Georgia";
    ctx.fillText("has been sorted into the house of", 400, 290);

    ctx.fillStyle = theme.accent;
    ctx.font = "bold 65px Georgia";
    ctx.fillText(house.toUpperCase(), 400, 380);

    ctx.font = "60px serif";
    ctx.fillText(theme.emoji, 400, 450);

    const link = document.createElement('a');
    link.download = `${userName}_Hogwarts_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    if (showResult && isCalculating) {
      const timer = setTimeout(() => setIsCalculating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCalculating]);

  // ფონის სტილი
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${hogwartsBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };

  if (!started) {
    return (
      <div style={backgroundStyle} className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl font-black text-yellow-500 mb-8 text-center italic drop-shadow-2xl">Hogwarts Sorting Hat 🧙‍♂️</motion.h1>
        <button onClick={() => setStarted(true)} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-5 px-14 rounded-full transition-all shadow-2xl uppercase tracking-[0.2em] border-b-4 border-yellow-800 active:border-0 active:translate-y-1">Begin the Ceremony</button>
      </div>
    );
  }

  if (showResult && isCalculating) {
    return (
      <div style={backgroundStyle} className="min-h-screen flex flex-col items-center justify-center text-white p-4 text-center">
        <h2 className="text-3xl mb-6 text-slate-300 font-serif italic animate-pulse">"Hmm, difficult... very difficult..."</h2>
        <div className="w-20 h-20 border-8 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showResult && !isCalculating) {
    const winner = getWinner();
    const houseData = {
      Gryffindor: { color: 'text-red-500', desc: 'Bravery, helping others, and chivalry. You are a true lion!', icon: '🦁' },
      Slytherin: { color: 'text-green-500', desc: 'Ambition, cunning, and resourcefulness. You will lead them all!', icon: '🐍' },
      Ravenclaw: { color: 'text-blue-500', desc: 'Intelligence, knowledge, and wit. A true seeker of truth!', icon: '🦅' },
      Hufflepuff: { color: 'text-yellow-400', desc: 'Loyalty, patience, and hard work. A friend you can always count on!', icon: '🦡' }
    };
    return (
      <div style={backgroundStyle} className="min-h-screen flex flex-col items-center justify-center text-white p-4 text-center">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-slate-900/90 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl border border-yellow-500/30 max-w-md w-full">
          <div className="text-7xl mb-4">{houseData[winner].icon}</div>
          <h1 className={`text-6xl font-black mb-4 uppercase ${houseData[winner].color} tracking-tighter`}>{winner}!</h1>
          <p className="text-slate-200 mb-8 italic text-lg leading-relaxed">"{houseData[winner].desc}"</p>

          <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10">
            <label className="text-[10px] uppercase text-yellow-500 font-bold mb-2 block tracking-widest text-left">Your Wizarding Name</label>
            <input type="text" placeholder="Type your name..." value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white text-lg mb-4 outline-none focus:border-yellow-500 transition-all" />
            <button onClick={() => generateIDCard(winner)} className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl text-sm transition-all uppercase shadow-lg border-b-2 border-yellow-800">📥 Get Official Certificate</button>
          </div>

          <a
            href="https://ko-fi.com/avtandilabuashvili44"
            target="_blank"
            className="block w-full py-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 text-amber-200 hover:from-amber-500/30 hover:to-orange-600/30 transition-all font-bold mb-6 text-sm shadow-xl hover:scale-[1.02] active:scale-95 text-center uppercase tracking-widest group"
          >
            <span className="inline-block group-hover:animate-bounce mr-2">🍺</span>
            Enjoyed the magic? Buy me a Butterbeer!
          </a>
          <div className="grid grid-cols-4 gap-3 mb-8">
            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)} className="bg-[#1877F2] py-3 rounded-xl font-bold text-xs">FB</button>
            <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=I'm a ${winner}!`)} className="bg-black py-3 rounded-xl font-bold text-xs border border-white/10">X</button>
            <button onClick={() => window.open(`https://www.reddit.com/submit?url=${window.location.href}`)} className="bg-[#FF4500] py-3 rounded-xl font-bold text-xs">RD</button>
            <button className="bg-gradient-to-tr from-[#f9ce34] to-[#6228d7] py-3 rounded-xl font-bold text-xs">IG</button>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full py-3 rounded-xl border border-white/20 text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs uppercase font-bold tracking-widest"
          >
            🔄 Retake the Ceremony
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col items-center justify-center text-white p-4">
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="max-w-xl w-full bg-slate-900/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
          <div className="flex justify-between text-[11px] text-yellow-500 mb-4 uppercase font-black tracking-[0.3em]">
            <span>Sorting Hat Ceremony</span>
            <span>{currentQuestion + 1} / 10</span>
          </div>
          <div className="w-full h-56 mb-8 overflow-hidden rounded-[1.5rem] border-2 border-white/5 shadow-inner">
            <img src={questions[currentQuestion].image} alt="magic" className="w-full h-full object-cover scale-105" />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-8 px-2 text-center leading-snug">{questions[currentQuestion].question}</h2>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option.house)} className="w-full text-left p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 transition-all text-sm font-medium shadow-sm hover:shadow-yellow-500/10 active:scale-[0.98]">
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;