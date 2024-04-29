import React, { useState } from "react";
import "./ReviewButton.css"
import EditReviewForm from "./EditReviewForm";

function EditReviewButton({ reviewData }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div style={{alignSelf: "end"}}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <button class="edit-review-button review-button" onClick={handleClick}><i class="fa fa-pencil-square-o"></i></button>
            <EditReviewForm reviewData={reviewData} isOpen={isOpen} />
        </div>
    );
}

export default EditReviewButton;