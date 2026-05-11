import React, { useState } from 'react';
import PremiumCard from './PremiumCard';

const PremiumModal = ({ isOpen, onClose, kofiLink, house, userName, setUserName,
    userImage, onPhotoUpload, onDownload, onUnlockPremium }) => {
    const [inputError, setInputError] = useState(false);
    const [goldCode, setGoldCode] = useState("");
    const [codeError, setCodeError] = useState(false);
    const [codeSuccess, setCodeSuccess] = useState(false);


    const [isDownloading, setIsDownloading] = useState(false);

    if (!isOpen) return null;

    const handleCodeSubmit = () => {
        if (goldCode.toUpperCase() === 'GOLD') {
            setCodeSuccess(true);
            onUnlockPremium();
        } else {
            setCodeError(true);
            setTimeout(() => setCodeError(false), 2000);
        }
    };


    const handlePremiumDownload = async () => {
        if (isDownloading) return;

        console.log("Download started...");
        setIsDownloading(true);

        try {

            await onDownload();
        } catch (err) {
            console.error("Error during download:", err);
        } finally {

            setTimeout(() => {
                setIsDownloading(false);
                console.log("Download finished.");
            }, 1000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-yellow-500/50 p-6 rounded-[2.5rem] max-w-md w-full text-center shadow-2xl my-auto">
                <h2 className="text-xl font-black text-yellow-500 mb-4 uppercase italic tracking-widest">Premium Wizard ID</h2>

                {!codeSuccess ? (
                    <div className="mb-6 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/30">
                        <p className="text-yellow-400 text-xs mb-3 uppercase tracking-widest">🔑 Enter Secret Code</p>
                        <p className="text-green-400 text-[10px] mb-3">Support on Ko-fi to get your secret code</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Secret Code..."
                                value={goldCode}
                                onChange={(e) => setGoldCode(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                                style={{ border: codeError ? '2px solid red' : '1px solid #334155' }}
                                className="flex-1 p-3 bg-black rounded-xl text-white text-center text-sm outline-none uppercase"
                            />
                            <button
                                onClick={handleCodeSubmit}
                                className="bg-yellow-600 px-4 rounded-xl font-bold text-xs uppercase hover:bg-yellow-500 transition-all"
                            >✓</button>
                        </div>
                        {codeError && <p className="text-red-400 text-[10px] mt-2">❌ Invalid Code</p>}
                        <a href={kofiLink} target="_blank" rel="noreferrer"
                            className="mt-3 w-full bg-amber-500 py-3 rounded-xl font-bold uppercase text-[10px] text-black flex items-center justify-center">
                            🍺 Get Code on Ko-fi ($1)
                        </a>
                    </div>
                ) : (
                    <p className="text-green-400 text-sm mb-4">✅ Premium Unlocked!</p>
                )}

                <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', marginBottom: '-40px', pointerEvents: 'none' }}>
                    <PremiumCard house={house} userName={userName} userImage={userImage} />
                </div>

                <div className="space-y-4 relative z-[110]">
                    <label style={{ display: 'block', width: '100%', backgroundColor: '#1e293b', border: '2px dashed #334155', padding: '12px', borderRadius: '16px', cursor: 'pointer' }}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {userImage ? "📸 Change Portrait" : "📸 Upload Portrait"}
                        </span>
                        <input type="file" style={{ display: 'none' }} onChange={onPhotoUpload} accept="image/*" />
                    </label>

                    <input
                        type="text"
                        placeholder="Your Wizard Name..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{ border: inputError ? '2px solid red' : '1px solid #1e293b' }}
                        className="w-full p-3 bg-black rounded-xl text-white text-center text-sm focus:border-yellow-500 outline-none"
                    />

                    <button
                        onClick={handlePremiumDownload}
                        disabled={isDownloading || !codeSuccess}
                        style={{
                            opacity: (isDownloading || !codeSuccess) ? 0.5 : 1,
                            pointerEvents: (isDownloading || !codeSuccess) ? 'none' : 'auto',
                            backgroundColor: (isDownloading || !codeSuccess) ? '#334155' : '#ca8a04',
                            cursor: isDownloading ? 'wait' : (codeSuccess ? 'pointer' : 'not-allowed')
                        }}
                        className="w-full py-3 rounded-xl font-bold uppercase text-xs transition-all flex items-center justify-center gap-2 text-white"
                    >
                        {isDownloading ? (
                            <>
                                <span className="premium-spinner"></span>
                                Wait...
                            </>
                        ) : "Download Premium ID"}
                    </button>
                </div>

                <button onClick={onClose} className="mt-4 text-slate-500 text-[10px] underline uppercase tracking-widest">Maybe Later</button>
            </div>
        </div>
    );
};

export default PremiumModal;