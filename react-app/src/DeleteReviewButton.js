import React from "react";
import "./ReviewButton.css"

function DeleteReviewButton() {
    return (
        <div style={{alignSelf: "end"}}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <button class="delete-review-button review-button"><i class="fa fa-trash"></i></button>
        </div>
    );
}

export default DeleteReviewButton;