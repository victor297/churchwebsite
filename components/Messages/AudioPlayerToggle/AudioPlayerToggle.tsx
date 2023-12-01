"use client"
import React, { useState } from 'react';
import { SlEarphones } from 'react-icons/sl';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerToggleProps {
    audio: {
        file: string;
    };
    iconSize?: string; 
}
const AudioPlayerToggle = ({ audio, iconSize = '1rem' }: AudioPlayerToggleProps) => {
    const [isAudioVisible, setIsAudioVisible] = useState(false);

    const toggleAudioVisibility = () => {
        setIsAudioVisible(!isAudioVisible);
    };

    return (
        <div className="">
            <button onClick={toggleAudioVisibility} className="flex hover:text-pink-400 gap-4">
                <SlEarphones className="hover:text-pink-400" style={{ fontSize: iconSize}}/>
                {iconSize !== '1rem' ? <div>Listen</div> : ""}
            </button>

            {isAudioVisible && (
                <div className={iconSize !== '1rem' ? "ml-[-100px]" : "ml-[-100px] p-4"}>
                    <div className={iconSize !== '1rem' ? "md:w-[60%] w-[80%] h-16 absolute pl-4" : "w-96 h-16 absolute pl-4"}>
                        <AudioPlayer
                            autoPlay
                            src={audio.file}
                            layout="horizontal-reverse"
                            className={iconSize !== '1rem' ? "mt-[-110px] ml-[-60px]" : ""}
                        />
                    </div>
                </div>

            )}
        </div>
    );
};

export default AudioPlayerToggle;