import React, { useState } from "react";
import axios from "axios"

const styles = {
    formInput: {
        marginBottom: "10px"
    },
    form: {
        width: "50%"
    },
    vStack: {
        display: "flex",
        flexDirection: "column",
    }
};

function CreateReviewForm() {

    const [files, setFiles] = useState([]);

    function uploadImage(file, reviewId) {
        /* 
        Note: For some reason React FormData will handle uploading the image as a binary file through ftp I guess
        Therefore it is important to turn file into a formdata and then transmit it
        */
        const formData = new FormData();
        formData.append('image', file);

        axios.post(`http://localhost:8000/review/image/${reviewId}`,
            formData,
            { // Pass headers as well, that way backend knows theres a file
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((response) => {
            console.log("Successfully uploaded image");
            console.log(response.data);
            console.log(response.status);
        })
        .catch((error) => {
            console.log("Error uploading image");
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }

    function postReview(formData) {
        let data = {
            title: formData.get("title"),
            body: formData.get("body"),
            rating: formData.get("rating")
        }
        axios.post(`http://localhost:8000/review/`, data)
        .then((response) => {
            // Wait to hear back that review was created
            console.log("Succesfully created review");
            console.log(response.data);
            console.log(response.status);

            const reviewId = response.data.insertedId;

            // Now post all images
            const files = formData.getAll('file');
            for (let file of files) {
                uploadImage(file, reviewId);
            }
        })
        .catch((error) => {
            console.log("Error posting review");
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }

    function submit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        postReview(formData);

    }

    function renderFileList () {
        return (
            <ol
                style={{
                    textAlign: 'left',
                    fontSize: "0.75rem"
                }}
            >
                {[...files].map((f, i) => (
                    <div className="image-name-list-item">
                        <li key={i}>
                            {f.name} - {f.type}
                        </li>
                        <img
                            src={URL.createObjectURL(f)}
                            style={{
                                maxHeight: "100px",
                                maxWidth: "100px",
                                overflow: "clip"
                            }}
                        />
                    </div>
                ))}
            </ol>
        );
    }


    return (
        <form
            onSubmit={submit}
            style={{...styles.form, ...styles.vStack}}
        >
            <input
                type="text"
                name="title"
                placeholder="Title"
                style={styles.formInput}
            />
            <input
                type="textarea"
                name="body"
                placeholder="Description"
                style={styles.formInput}
            />
            <input
                type="number"
                name="rating"
                min="1"
                max="10"
                placeholder="Rating (1-10)"
                style={styles.formInput}
            />
            <input
                type="file"
                name="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={(event) => {setFiles(event.target.files)}}
                style={styles.formInput}
            />
            {renderFileList()}
            <input
                type="submit"
                value="Submit"
                style={styles.formInput}
            />
        </form>
    );
}

export default CreateReviewForm;