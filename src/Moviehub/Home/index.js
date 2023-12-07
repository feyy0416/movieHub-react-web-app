import axios from 'axios';
import React, { useState, useEffect } from 'react';
import noImg from '../../img/No_Picture.jpg';
import { Link } from 'react-router-dom';

function Home() {

    const [upcoming, setUpcoming] = useState([]);

    const fetchUpcoming = async () => {
        try {
            const response = await axios.get('https://moviesdatabase.p.rapidapi.com/titles/x/upcoming', {
                headers: {
                    'X-RapidAPI-Key': '41770f2d7amsh70d8657dc3c363fp1aff05jsn06ad5e44d716',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
                },
            });
            setUpcoming(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUpcoming();
    }, []);

    return (
        <div className="h-100" style={{ backgroundColor: "#C0C0C0"}}>
            {/* style={{ backgroundColor: "#C0C0C0" }} */}
            <p className="fw-bold w-100 fs-3 pt-2 pb-2" style={{ textAlign: "center" , color:"#505050", backgroundColor:"#9e9e9e" }}>Upcoming Movies</p>

            <div className="d-flex flex-row flex-wrap" style={{ margin: "0 auto", maxWidth: "980px" }}>
                {
                    upcoming.map((movie, index) => (
                        <Link
                            key={index}
                            to={{
                                pathname: `/Moviehub/movies/${movie.id}`,
                            }}
                            className="list-group-item">

                            <div className="card m-3 border border-2 border-secondary" style={{ width: "203px" }}>
                                {(movie.primaryImage === null || movie.primaryImage.url === null) ? (
                                    <img src={noImg} style={{ width: "200px", height: "250px" }}></img>
                                ) : (
                                    <img src={movie.primaryImage.url} style={{ width: "200px", height: "250px" }}></img>
                                )
                                }
                                <div className="card-body" style={{ backgroundColor: "#F5F5F5" }}>
                                    <h5 className="card-title text-truncate ms-2" style={{ color: "#808080" }}>{movie.originalTitleText.text}</h5>
                                    <p className="card-text text-truncate ms-2" style={{ color: "#808080" }}>{movie.releaseYear ? movie.releaseYear.year : 'Unavailable'}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}
export default Home;