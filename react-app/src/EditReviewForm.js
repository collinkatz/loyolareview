import React from "react";
import "./EditReviewForm.css"

function EditReviewForm({ reviewData, isOpen }) {
    return (
        <div className="edit-review-form-container">
            {isOpen ?
                <form
                    className="edit-review-form"
                    // onSubmit={submit}
                >
                    <h6>Submit a Review</h6>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        placeholder="Title"
                    />
                    <input
                        className="form-input"
                        type="textarea"
                        name="body"
                        placeholder="Description"
                    />
                    <input
                        className="form-input"
                        type="number"
                        name="rating"
                        min="1"
                        max="10"
                        placeholder="Rating (1-10)"
                    />
                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>
            :
                <></>
            }
        </div>
    );
}

export default EditReviewForm;