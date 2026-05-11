import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const PhotoCropper = ({ image, onCropDone, onCancel, house }) => {
    const [scale, setScale] = useState(0.7);
    const editorRef = useRef(null);

    const handleApply = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            onCropDone(canvas.toDataURL());

        }
    };

    const handleDone = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            onCropDone(canvas.toDataURL());
            onCancel();
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <div className="bg-slate-900 border border-yellow-500/30 p-6 rounded-[2rem] max-w-sm w-full text-center">
                <h3 className="text-yellow-500 font-bold mb-1 uppercase tracking-widest">Adjust Your Portrait</h3>
                <p className="text-slate-500 text-[10px] mb-4 uppercase">Drag to position • Slider to zoom</p>

                <div className="flex justify-center mb-4 relative overflow-hidden rounded-xl border border-white/10"
                    style={{ width: 280, height: 220 }}>
                    <AvatarEditor
                        ref={editorRef}
                        image={image}
                        width={280}
                        height={220}
                        border={0}
                        borderRadius={0}
                        color={[0, 0, 0, 0.8]}
                        scale={scale}
                        rotate={0}
                    />
                    <img
                        src={`/images/uniforms/${house?.toLowerCase()}.png`}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        style={{ zIndex: 10 }}
                        alt="Uniform"
                    />
                </div>

                <div className="mb-4">
                    <p className="text-[10px] text-slate-400 mb-2 uppercase italic">Zoom</p>
                    <input
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.01"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-full h-1 bg-yellow-500/20 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                </div>


                <div className="flex gap-2">
                    <button onClick={onCancel}
                        className="flex-1 py-3 text-xs font-bold text-slate-400 uppercase hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleApply}
                        className="flex-1 bg-slate-700 py-3 rounded-xl font-bold uppercase text-xs hover:bg-slate-600 transition-all">
                        Preview ↑
                    </button>
                    <button onClick={handleDone}
                        className="flex-1 bg-yellow-600 py-3 rounded-xl font-bold uppercase text-xs hover:bg-yellow-500 transition-all">
                        Done ✓
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoCropper;