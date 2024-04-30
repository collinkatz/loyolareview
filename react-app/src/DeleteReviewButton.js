import React, { useState } from "react";
import "./ReviewButton.css"
import DeleteReviewForm from "./DeleteReviewForm";

function DeleteReviewButton({ reviewData }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div style={{alignSelf: "end"}}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <button class="delete-review-button review-button button-circle" onClick={handleClick}><i class="fa fa-trash"></i></button>
            <DeleteReviewForm reviewData={reviewData} isOpen={isOpen} handleClick={handleClick} />
        </div>
    );
}

export default DeleteReviewButton;