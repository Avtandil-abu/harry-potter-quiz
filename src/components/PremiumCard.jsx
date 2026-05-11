import React from 'react';

const PremiumCard = ({ userName, house, userImage, previewOnly = false }) => {
    const houseStyles = {
        Gryffindor: { bg: "#740001", border: "#C09338", text: "#ffffff", shadow: "rgba(116, 0, 1, 0.5)", accent: "#FFD700" },
        Slytherin: { bg: "#1A472A", border: "#AAAAAA", text: "#ffffff", shadow: "rgba(26, 71, 42, 0.5)", accent: "#FFD700" },
        Ravenclaw: { bg: "#0E1A40", border: "#946B2D", text: "#ffffff", shadow: "rgba(14, 26, 64, 0.5)", accent: "#FFD700" },
        Hufflepuff: { bg: "#ECB939", border: "#372e29", text: "#000000", shadow: "rgba(236, 185, 57, 0.5)", accent: "#000000" },
    };

    const style = houseStyles[house] || houseStyles.Gryffindor;

    return (
        <div id="premium-card-download" style={{
            backgroundColor: style.bg,
            border: `6px solid ${style.border}`,
            color: style.text,
            boxShadow: 'none',
            width: '320px',
            height: 'auto',
            minHeight: '540px',
            borderRadius: '0',
            padding: '20px',
            fontFamily: 'serif',
            margin: '0 auto',
            overflow: 'visible',
            position: 'relative',
        }}>

            <div style={{ textAlign: 'center', marginBottom: '16px', paddingTop: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.2em', margin: '0 0 4px 0' }}>MINISTRY OF MAGIC</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '12px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>Official Wizard Identification</p>
                    <span style={{
                        color: '#000000',
                        fontSize: '18px',
                        fontWeight: '900',
                        fontStyle: 'italic',
                        fontFamily: 'serif',
                        marginLeft: '5px'
                    }}>Premium</span>
                </div>
            </div>

            {/* Photo Section */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '220px',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '16px',
            }}>
                {userImage && (
                    <img src={userImage} style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', zIndex: 0
                    }} alt="User" />
                )}
                <img src={`./images/uniforms/${house.toLowerCase()}.png`} style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', zIndex: 10,
                    pointerEvents: 'none'
                }} alt="Uniform" />
            </div>

            {/* User Info */}
            <div style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                    <p style={{ fontSize: '7px', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.2em', margin: '0 0 4px 0' }}>Wizard Name</p>
                    <h3 style={{
                        fontSize: userName && userName.length > 10 ? '14px' : '18px',
                        fontWeight: '900', textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: '8px', margin: 0,
                        wordBreak: 'break-word'
                    }}>
                        {userName || "Young Wizard"}
                    </h3>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '7px', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.2em', margin: '0 0 4px 0' }}>Department / House</p>
                        <p style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: style.accent, margin: 0 }}>
                            {house}
                        </p>
                    </div>
                    <img src={`./images/seals/${house.toLowerCase()}.png`} style={{ width: '48px', height: '48px', objectFit: 'contain' }} alt="Seal" />
                </div>
            </div>

            {/* Footer */}
            <div style={{
                position: 'absolute', bottom: '24px', left: 0,
                width: '100%', padding: '0 32px',
                display: 'flex', justifyContent: 'space-between',
                opacity: 0.4, fontSize: '7px', fontFamily: 'monospace',
                boxSizing: 'border-box'
            }}>
                <span>VERIFIED ID</span>
                <span>#HOG-{Math.floor(Math.random() * 9000) + 1000}</span>
            </div>
        </div>
    );
};

export default PremiumCard;