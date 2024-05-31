import React, { useRef, useEffect } from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imageURL, aspectRatio }) => {
    const DEFAULT_HEIGHT = 512;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = imageURL;

        image.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Set canvas dimensions based on aspect ratio and parent container width
            const canvasWidth = canvas.parentElement.offsetWidth;
            const canvasHeight = canvasWidth / aspectRatio;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Draw the image on the canvas
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Draw each box
            boxes.forEach(box => {
                const { leftCol, topRow, rightCol, bottomRow } = box;
                context.beginPath();
                context.lineWidth = '2';
                context.strokeStyle = 'red';
                context.rect(leftCol, topRow, rightCol - leftCol, bottomRow - topRow);
                context.stroke();
            });
        };
    }, [imageURL, boxes, aspectRatio]);

    return (
        <div className="outsideWrapper center" style={{ width: `${DEFAULT_HEIGHT * aspectRatio}px` }}>
            <div className="insideWrapper">
                <img id="img" src={imageURL} className="coveredImage" alt='' />
                <canvas ref={canvasRef} className="coveringCanvas"></canvas>
            </div>
        </div>
    );
}

export default FaceRecognition;
