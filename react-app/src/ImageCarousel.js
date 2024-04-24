import React, { useState } from "react";
import "./ImageCarousel.css"

function ImageCarousel({ images }) {
    const [rightPreviewClassName, setRightPreviewClassName] = useState("card-image-preview-right");
    const [leftPreviewClassName, setLeftPreviewClassName] = useState("card-image-preview-left");
    const [centerImageClassName, setCenterImageClassName] = useState("card-image");
    const [currentIndex, setCurrentIndex] = useState(0);

    function getAdjacentImageIndex(direction) {
        if (direction === "left") {
            let index = currentIndex > 0 ? images[currentIndex - 1] : images[images.length - 1]
            return index;
        } else if (direction === "right") {
            let index = currentIndex < images.length - 1 ? images[currentIndex + 1] : images[0]
            return index;
        }
    }

    const handleNavigation = (direction) => {
        if (direction === 'left') {
            setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
        } else {
            setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
        }
    };

    return (
        <div className="image-container">
            
            <img
                className={leftPreviewClassName}
                src={`http://localhost:8000/images/${getAdjacentImageIndex("left")}`}
            />
            <img
                className={centerImageClassName}
                src={`http://localhost:8000/images/${images[currentIndex]}`}
            />
            <img
                className={rightPreviewClassName}
                src={`http://localhost:8000/images/${getAdjacentImageIndex("right")}`}
            />

            <div className="arrow-container left"  onClick={() => handleNavigation('left')}>
                <div className="arrow">❮</div>
            </div>
            <div className="arrow-container right" onClick={() => handleNavigation('right')}>
                <div className="arrow">❯</div>
            </div>
        </div>
    );
}

export default ImageCarousel;