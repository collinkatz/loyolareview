import logo from './logo.svg';
import './App.css';
import CreateReviewForm from './CreateReviewForm';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);

  function getReviews() {
    axios.get(`http://localhost:8000/review/`)
    .then((response) => {
      console.log(response.data);
      console.log(response.status);
      setReviews(response.data);
    })
    .catch((error) => {
      console.log("Error getting reviews");
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

  useEffect(() => {
    getReviews();
  }, [])

  return (
    <div className="App">
      <header className="App-header" style={{ overflow: "auto" }}>
        <div className='main'>
          <CreateReviewForm />
          {reviews !== undefined ?
            (reviews.map((reviewData, index) => {
              // console.log(reviewData)
              return <ReviewCard reviewData={reviewData}/>
            }))
          :
            <></>
          }
        </div>
      </header>
    </div>
  );
}

export default App;
