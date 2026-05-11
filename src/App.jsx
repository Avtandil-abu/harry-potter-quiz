import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import allQuestions from './questions.json';
import hogwartsBg from './bg.jpg';
import { supabase } from './supabaseClient';
import html2canvas from 'html2canvas';
import './App.css';


import AdminPanel from './AdminPanel';
import AdBanner from './components/AdBanner';
import PremiumCard from './components/PremiumCard';
import PremiumModal from './components/PremiumModal';
import PhotoCropper from './components/PhotoCropper';

const houseDetails = {
  Gryffindor: { color: "#740001", accent: "#C09338", description: "You demonstrate exceptional bravery, daring, and chivalry.", seal: "/images/seals/gryffindor.png" },
  Slytherin: { color: "#1A472A", accent: "#AAAAAA", description: "Your ambition, resourcefulness, and leadership are unmatched.", seal: "/images/seals/slytherin.png" },
  Ravenclaw: { color: "#0E1A40", accent: "#946B2D", description: "Your mind is sharp and your thirst for knowledge is unquenchable.", seal: "/images/seals/ravenclaw.png" },
  Hufflepuff: { color: "#ECB939", accent: "#372e29", description: "Your loyalty, patience, and fair play are exemplary.", seal: "/images/seals/hufflepuff.png" }
};

const smokeVariant = {
  initial: { opacity: 0, filter: "blur(10px)", scale: 1.1 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, filter: "blur(10px)", scale: 0.9, transition: { duration: 0.6, ease: "easeIn" } }
};

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 });
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);
  const [userName, setUserName] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [inputError, setInputError] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const [tempImage, setTempImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ambientAudio = useRef(new Audio('/sounds/ambient.mp3'));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') setIsAdmin(true);
  }, []);

  const startQuiz = () => {
    const shuffled = [...allQuestions]
      .map(q => ({ ...q, options: [...q.options].sort(() => Math.random() - 0.5) }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuizQuestions(shuffled);
    setStarted(true);
    ambientAudio.current.loop = true;
    ambientAudio.current.play().catch(() => { });
  };

  const handleAnswer = (house) => {
    setScore((prev) => ({ ...prev, [house]: prev[house] + 1 }));
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      ambientAudio.current.pause();
    }
  };

  const getWinner = () => Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));

  useEffect(() => {
    if (showResult && isCalculating) {
      const winner = getWinner();
      setTimeout(() => {
        setIsCalculating(false);
        new Audio(`/sounds/${winner.toLowerCase()}.mp3`).play().catch(() => { });
      }, 3000);
    }
  }, [showResult, isCalculating]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setTempImage(ev.target.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };


  const generateIDCard = async (winner, forcePremium = false) => {
    if (!userName.trim()) {
      setInputError(true);
      setStatusMsg("❌ Enter Name!");
      setTimeout(() => setInputError(false), 3000);
      return;
    }

    const elementId = (isPremium || forcePremium) ? 'premium-card-download' : 'certificate-display';
    console.log("elementId:", elementId);

    const element = document.getElementById(elementId);
    console.log("element:", element);
    if (!element) {
      console.log("ELEMENT NOT FOUND!");
      return;
    }
    try {

      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const link = document.createElement('a');
      link.download = `Hogwarts_${userName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      await supabase.from('quiz_results').insert({
        user_name: userName,
        house_result: winner,
        is_premium: isPremium || forcePremium,
        created_at: new Date().toISOString()
      });


    } catch (err) {
      console.error("Download Error:", err);
      setStatusMsg("❌ Download Failed!");
    }
  };

  const shareUrl = window.location.href;
  const bgStyle = { backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${hogwartsBg})`, backgroundSize: 'cover', backgroundPosition: 'center' };

  if (isAdmin) return <AdminPanel />;

  if (!started) return (
    <div style={bgStyle} className="min-h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-6xl font-black text-yellow-500 mb-8 italic text-center drop-shadow-2xl uppercase tracking-tighter">Hogwarts Sorting Hat</h1>
      <button onClick={startQuiz} className="bg-yellow-600 p-5 px-14 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all">Begin the Ceremony</button>
    </div>
  );


  if (showResult && isCalculating) return (
    <div style={bgStyle} className="min-h-screen flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-3xl mb-6 italic animate-pulse">"Hmm, difficult... let me see..."</h2>
      <motion.img src="/images/sorting_hat.png" alt="Sorting Hat" className="w-24 h-24 mt-4" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    </div>
  );

  if (showResult && !isCalculating) {
    const winner = getWinner();
    const details = houseDetails[winner];

    return (
      <div style={bgStyle} className="min-h-screen flex flex-col items-center justify-center text-white p-4 text-center overflow-y-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full my-8">

          {isPremium ? (
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
              <PremiumCard userName={userName} house={winner} userImage={userImage} />
            </div>
          ) : (
            <div id="certificate-display" style={{
              position: 'relative', padding: '8px', borderRadius: '8px',
              marginBottom: '32px', backgroundColor: '#d4af37',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              margin: '0 auto 32px', width: '100%', maxWidth: '320px'
            }}>
              <div style={{
                position: 'relative', zIndex: 10, padding: '24px',
                textAlign: 'center', fontFamily: 'serif',
                border: '4px double rgba(255,255,255,0.3)',
                borderRadius: '6px',
                backgroundColor: details.color,
                color: winner === 'Hufflepuff' ? '#000000' : '#ffffff'
              }}>
                <h2 style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>Hogwarts Certificate</h2>
                <p style={{ fontSize: '10px', fontStyle: 'italic', marginBottom: '4px', opacity: 0.8 }}>This is to certify that</p>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '12px 0', textTransform: 'uppercase', padding: '0 8px' }}>{userName || "YOUNG WIZARD"}</h3>
                <p style={{ fontSize: '10px', marginBottom: '4px', opacity: 0.8 }}>is officially a member of</p>
                <h4 style={{
                  fontSize: '30px', fontWeight: '900', marginBottom: '16px',
                  textTransform: 'uppercase', letterSpacing: '-0.05em',
                  color: winner === 'Hufflepuff' ? '#7c3aed' : '#FFD700',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
                }}>{winner}</h4>
                <p style={{ fontSize: '11px', fontStyle: 'italic', lineHeight: '1.4', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px', padding: '16px 8px 0', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  "{details.description}"
                </p>
                <img src={details.seal} style={{ width: '64px', height: '64px', margin: '16px auto 0', display: 'block' }} alt="Seal" />
                <div style={{ marginTop: '16px', fontSize: '7px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Verified by Sorting Hat</div>
              </div>
            </div>
          )}

          <AdBanner isPremium={isPremium} />

          <div className="bg-slate-900/95 p-6 rounded-[2rem] border border-yellow-500/30 backdrop-blur-md relative mt-4">
            <input
              type="text"
              className="luxury-id-input"
              placeholder="Enter Your Full Name..."
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);

              }}
              className={`w-full p-3 bg-black border rounded-xl text-white mb-4 outline-none text-center ${inputError ? 'border-red-500' : 'border-slate-700'}`}
            />

            <button
              onClick={() => generateIDCard(winner)}
              className="w-full bg-yellow-600 py-3 rounded-xl font-bold uppercase mb-4 transition-all main-download-button"
            >
              Download Result
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-xl font-black text-[10px] uppercase mb-6 
             transition-all duration-300 cursor-pointer
             hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg active:scale-95"
            >
              {isPremium ? "Premium Settings" : "Get Premium ID"}
            </button>

            <div className="grid grid-cols-4 gap-2 mb-6">
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)}
                className="bg-[#1877F2] py-2 rounded-lg font-bold text-[10px] transition-all cursor-pointer hover:-translate-y-1 hover:brightness-110"
              >FB</button>

              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=I'm a ${winner}!`)}
                className="bg-black py-2 rounded-lg font-bold text-[10px] border border-white/20 transition-all cursor-pointer hover:-translate-y-1 hover:brightness-110"
              >X</button>

              <button
                onClick={() => window.open(`https://www.reddit.com/submit?url=${shareUrl}`)}
                className="bg-[#FF4500] py-2 rounded-lg font-bold text-[10px] transition-all cursor-pointer hover:-translate-y-1 hover:brightness-110"
              >RD</button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                    .then(() => {
                      setCopySuccess(true);
                      setTimeout(() => setCopySuccess(false), 2000);
                    });
                }}
                className="bg-gradient-to-tr from-[#f9ce34] to-[#6228d7] py-2 rounded-lg font-bold text-[10px] transition-all cursor-pointer hover:-translate-y-1 hover:brightness-110 ig-button text-white relative"
              >
                IG

                {copySuccess && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[8px] py-1 px-2 rounded-md border border-white/20 whitespace-nowrap animate-bounce">
                    📋 Copied!
                  </div>
                )}
              </button>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="text-slate-400 text-xs underline transition-all cursor-pointer hover:text-yellow-500"
            >
              Retake the Ceremony
            </button>
          </div>
        </motion.div>

        <PremiumModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          kofiLink="https://ko-fi.com/avtandilabuashvili44"
          house={winner}
          userName={userName}
          setUserName={setUserName}
          userImage={userImage}
          onPhotoUpload={handlePhotoUpload}
          onUnlockPremium={() => setIsPremium(true)}
          onDownload={() => {
            generateIDCard(winner, true);
          }}

        />

        {isCropping && (
          <PhotoCropper
            image={tempImage}
            house={winner}
            onCropDone={(croppedData) => { setUserImage(croppedData); setIsCropping(false); }}
            onCancel={() => setIsCropping(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div style={bgStyle} className="min-h-screen flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} variants={smokeVariant} initial="initial" animate="animate" exit="exit" className="max-w-xl w-full bg-slate-900/85 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm shadow-2xl">
          <div className="text-yellow-500 text-xs font-bold mb-4 uppercase tracking-widest text-center">{currentQuestion + 1} / {quizQuestions.length}</div>


          {quizQuestions[currentQuestion]?.image && (
            <img src={quizQuestions[currentQuestion].image} className="w-full h-48 object-cover rounded-2xl mb-6 border border-white/10" alt="Quiz Scene" />
          )}

          <h2 className="text-xl font-serif font-bold mb-6 text-center text-white">{quizQuestions[currentQuestion]?.question}</h2>
          <div className="grid gap-3">
            {quizQuestions[currentQuestion]?.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt.house)} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-left text-white transition-all hover:pl-6">{opt.text}</button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;