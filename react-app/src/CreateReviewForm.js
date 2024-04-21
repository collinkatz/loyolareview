import React, { useState } from "react";

function CreateReviewForm() {

    const [files, setFiles] = useState([]);

    function uploadImage() {

    }

    function submit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        console.log(formData);
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
            style={{
                display: "flex",
                flexDirection: "column",

            }}
        >
            <input
                type="text"
                name="title"
                placeholder="Title"
                style={{marginBottom: "10px"}}
            />
            <input
                type="file"
                name="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={(event) => {setFiles(event.target.files)}}
                style={{marginBottom: "10px"}}
            />
            {renderFileList()}
            <input
                type="submit"
                value="Submit"
                style={{marginBottom: "10px"}}
            />
        </form>
    );
}

export default CreateReviewForm;