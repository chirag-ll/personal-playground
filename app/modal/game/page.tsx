'use client';

import { useState } from 'react';

export default function GameModalPage() {
    const [isOpen, setIsOpen] = useState(false);

    const openGameModal = () => {
        setIsOpen(true);
    };

    const closeGameModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={openGameModal}>Open Game</button>

            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        width: '80%',
                        maxWidth: '800px',
                        height: '600px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={closeGameModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                color: 'black'
                            }}
                        >
                            ✕
                        </button>
                        <iframe
                            src="https://tnt-match-center-qa.livelikeapp.com/bobsleigh-battle.html"
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                marginTop: '30px'
                            }}
                            title="Game Modal"
                        />
                    </div>
                </div>
            )}
        </>
    );
}