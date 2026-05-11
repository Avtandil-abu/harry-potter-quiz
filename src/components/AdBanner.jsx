import React, { useEffect } from 'react';

const AdBanner = ({ isPremium }) => {
    if (isPremium) return null;

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://pl29416546.profitablecpmratenetwork.com/48532c68b49923ec28defd6c2f55a243/invoke.js';
        document.getElementById('ad-container')?.appendChild(script);
    }, []);

    return (
        <div className="flex flex-col items-center my-6 p-2 bg-white/5 rounded-xl border border-white/10">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Advertisement</p>
            <div id="ad-container">
                <div id="container-48532c68b49923ec28defd6c2f55a243"></div>
            </div>
        </div>
    );
};

export default AdBanner;