import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditReviewForm.css";
import "./ReviewButton.css";

function DeleteReviewForm({ reviewData, isOpen, handleClick }) {

    function deleteReview() {
        axios.delete(`http://localhost:8000/review/${reviewData._id}`)
        .then((response) => {
            // Wait to hear back that review was updated
            console.log("Succesfully deleted review");
            console.log(response.data);
            console.log(response.status);

            const reviewId = response.data.upsertedId;

            // Reload Page now
            setTimeout(function() {
                window.location.reload();
            }, 1000);
        })
        .catch((error) => {
            console.log("Error deleting review");
            if (error.response) {
                // request made and server responded with a status code that isnt in 200s
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // request made but no response was received
                console.log(error.request);
            } else {
                // setting up the request triggered an error
                console.log('Error', error.message);
            }
        });
    }

    function submit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        deleteReview(formData);

    }

    return (
        <>
        {isOpen ?
            <div className="edit-review-form-container">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <button class="close-modal-button review-button" onClick={handleClick}><i class="fa fa-close"></i></button>
                    <form
                        className="edit-review-form"
                        onSubmit={submit}
                    >
                        <h6 className="form-title">Are you sure you want to delete this review</h6>
                        <h6 className="form-title">{reviewData.title}</h6>
                        <input
                            className="form-submit-button review-button"
                            type="submit"
                            value="Delete"
                        />
                    </form>
            </div>
        :
            <></>
        }
        </>
    );
}

export default DeleteReviewForm;