import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditReviewForm.css";
import "./ReviewButton.css";

function EditReviewForm({ reviewData, isOpen, handleClick }) {
    const [formData, setFormData] = useState(reviewData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
    };

    function patchReview() {
        let data = {
            title: formData.title,
            body: formData.body,
            rating: formData.rating
        }
        axios.patch(`http://localhost:8000/review/${formData._id}`, data)
        .then((response) => {
            // Wait to hear back that review was updated
            console.log("Succesfully updated review");
            console.log(response.data);
            console.log(response.status);

            const reviewId = response.data.upsertedId;

            // Reload Page now
            setTimeout(function() {
                window.location.reload();
            }, 1000);
        })
        .catch((error) => {
            console.log("Error updating review");
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

        patchReview(formData);

    }

    return (
        <>
        {isOpen ?
            <div className="edit-review-form-container">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <button class="close-modal-button review-button button-circle" onClick={handleClick}><i class="fa fa-close"></i></button>
                    <form
                        className="edit-review-form"
                        onSubmit={submit}
                    >
                        <h6 className="form-title">Edit Review</h6>
                        <input
                            className="form-input"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={handleChange}
                            value={formData.title}
                        />
                        <textarea
                            className="form-input"
                            type="textarea"
                            name="body"
                            placeholder="Description"
                            onChange={handleChange}
                            // value={formData.body}
                            style={{height: "100%"}}
                        >{formData.body}</textarea>
                        <input
                            className="form-input"
                            type="number"
                            name="rating"
                            min="1"
                            max="10"
                            placeholder="Rating (1-10)"
                            onChange={handleChange}
                            value={formData.rating}
                        />
                        <input
                            className="form-submit-button review-button button-rectangle"
                            type="submit"
                            value="Submit"
                        />
                    </form>
            </div>
        :
            <></>
        }
        </>
    );
}

export default EditReviewForm;