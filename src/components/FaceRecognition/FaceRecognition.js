import React, { useEffect, useState, useRef } from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, aspectRatio }) => {
        const DEFAULT_HEIGHT = 512;

        return (
            <div className="outsideWrapper center" style={{width:`${DEFAULT_HEIGHT*aspectRatio}px`}}>
                <div className="insideWrapper">
                    <img src={imageURL} className="coveredImage" alt=''></img>
                    <canvas className="coveringCanvas"></canvas>
                </div>
            </div>
        );
    }

export default FaceRecognition;
