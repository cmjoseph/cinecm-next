'use client'

import React, { useEffect } from 'react'

interface YouTubePlayerProps {
    videoId: string
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: any;
    }
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    useEffect(() => {
        // Load the IFrame Player API code asynchronously
        const tag = document.createElement('script')
        tag.src = "https://www.youtube.com/iframe_api"
        const firstScriptTag = document.getElementsByTagName('script')[0]
        if (firstScriptTag.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        let player = null;
        // Create the player once the API code downloads
        window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'autoplay': 0,
                    'mute': 1
                }
            })
        }
        return () => {
            window.onYouTubeIframeAPIReady = null
        }
    }, [videoId])

    return <div id="player"></div>
}

export default YouTubePlayer
