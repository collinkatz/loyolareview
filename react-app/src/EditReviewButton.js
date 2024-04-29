import React from "react";
import "./ReviewButton.css"

function EditReviewButton() {
    return (
        <div style={{alignSelf: "end"}}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <button class="delete-review-button review-button"><i class="fa fa-pencil-square-o"></i></button>
        </div>
    );
}

export default EditReviewButton;