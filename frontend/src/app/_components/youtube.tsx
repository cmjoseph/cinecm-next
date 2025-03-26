'use client'
import styles from "../_assets/scss/single.module.scss";
import React, { useEffect, useRef, useState } from 'react';
import Script from "next/script";

interface YouTubePlayerProps {
    videoId: string
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: any;
    }
}

interface YT {
    Player: {
        new (elementId: string, options: YT.PlayerOptions): YT.Player;
    };
}

declare namespace YT {
    interface Player {
        destroy(): void;
        seekTo(seconds: number, allowSeekAhead?: boolean): void;
        pauseVideo(): void;
        playVideo(): void;
    }

    interface PlayerOptions {
        height?: string | number;
        width?: string | number;
        videoId?: string;
        events?: {
            onReady?: (event: any) => void;
            onStateChange?: (event: any) => void;
        };
    }

    interface PlayerEvent {
        target: Player;
    }
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    const playerRef = useRef(null);
    const [player, setPlayer] = useState(null);
    
    const onPlayerReady = (event: YT.PlayerEvent) => {
        event.target.seekTo(0);
        event.target.playVideo();
    }
    
    const onPlayerStateChange = (event: any) => { 
        const duration = event.target.getDuration();
        const iframe = document.querySelector('iframe');
        
        if (event.data === (window as any).YT.PlayerState.PLAYING) {
            setInterval(function () {
                let time = event.target.getCurrentTime();
                if(time > (duration - 20)) {          
                    if (iframe) iframe.className = styles.js_trailer_end;
                }
            }, 1000)
        }
    }
    useEffect(() => {
        if (!(window as any).YT) return;
        
        const loadPlayer = () => {
            if (playerRef.current && !player) {
                const newPlayer = new (window as any).YT.Player(playerRef.current, {
                    height: "360",
                    width: "640",
                    videoId,
                    playerVars: {
                        autoplay: 1, 
                        mute: 1,
                        controls: 0,
                    },
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange
                    }
                });
                setPlayer(newPlayer);
            }
        };
    
        loadPlayer();
      }, [videoId]);

    return (
        <>
            <Script
                src="https://www.youtube.com/iframe_api"
                strategy="lazyOnload"
                onLoad={() => {
                    window.onYouTubeIframeAPIReady = null;
                    if ((window as any).YT) {
                        window.onYouTubeIframeAPIReady = () => {
                            setPlayer(new (window as any).YT.Player(playerRef.current, {
                                height: "360",
                                width: "640",
                                videoId,
                                playerVars: {
                                    autoplay: 1,
                                    mute: 1,
                                    controls: 0,
                                },
                                events: {
                                    onReady: onPlayerReady,
                                    onStateChange: onPlayerStateChange
                                }
                            }));
                        };
                    }
                }}
            />
            <div ref={playerRef}></div>
        </>
    )
}

export default YouTubePlayer
