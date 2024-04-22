import React from "react";

const styles = {
    card: {
        width: '100%',
        margin: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        background: '#fff',
        textAlign: 'left'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '24px',
        color: '#333'
    },
    body: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px',
        /* Trunkate text: https://stackoverflow.com/questions/53156266/reactjs-multiline-textarea-with-ellipsis */
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'left',
        marginTop: '20px'
    },
    rating: {
        color: '#4A90E2'
    },
    date: {
        color: '#4A90E2'
    }
};

function ReviewCard({ reviewData }) {
    return (
        <div style={styles.card} className="review-card">
            <div style={styles.header}>
                <span style={styles.title}>{reviewData.title}</span>
                <span style={styles.rating}>Rating: {reviewData.rating} / 10</span>
                <span style={styles.date}>{new Date(reviewData.date_created).toLocaleDateString()}</span>
            </div>
            <p style={styles.body}>{reviewData.body}</p>
            <div style={styles.footer}>
                {reviewData.image_names.map((image_name, index) => {
                    return (
                        <img 
                            src={`http://localhost:8000/images/${image_name}`}
                            style={{
                                maxHeight: "200px",
                                maxWidth: "200px",
                                overflow: "clip"
                            }}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default ReviewCard;