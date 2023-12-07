import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './index.css';
import noImg from '../../img/No_Picture.jpg';
import { Link } from 'react-router-dom';

//api key:  9dec7a3f27mshd90c09cf0f38b4cp18ab44jsn558e7ab1152b

function Search() {

    const [searchField, setSearchField] = useState("");
    const [movies, setMovies] = useState([]);


    const handleSearch = async () => {
        if (searchField !== "") {
            try {
                const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/search/keyword/${searchField}`, {
                    // params: {keyword: searchField },
                    headers: {
                        'X-RapidAPI-Key': '41770f2d7amsh70d8657dc3c363fp1aff05jsn06ad5e44d716',
                        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
                    },
                });
    
                setMovies(response.data.results);
                console.log(movies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    useEffect(() => {
        handleSearch();
    }, []);


    return (
        <div style={{ margin: "0 auto", maxWidth: "980px" }}>
            <div className="mt-3 w-100">
                <div className="form-outline" data-mdb-input-init>
                    <input type="text"
                        id="search-area"
                        className="form-control d-inline search-bar border border-secondary border-2"
                        placeholder="Search for Movies!"
                        onChange={(e) => setSearchField(e.target.value)} 
                        style={{maxWidth:"930px"}}/>
                    <button className="btn btn-secondary d-inline search-btn border-2" onClick={handleSearch}>
                        <FaSearch className="mb-1 d-inline" />
                    </button>
                </div>
            </div>

            <div className="d-flex flex-row flex-wrap">
                {
                    movies.map((movie, index) => (
                        <Link
                            key={index}
                            to={{
                                pathname: `/Moviehub/movies/${movie.id}`,
                                state: { movie }, // Pass the movie details as state
                            }}
                            className="list-group-item">

                            <div className="m-3 border border-2 border-secondary" style={{width: "203px"}}>
                                {(movie.primaryImage === null || movie.primaryImage.url === null) ? (
                                    <img src={noImg} style={{ width: "200px", height: "250px" }}></img>
                                ) : (
                                    <img src={movie.primaryImage.url} style={{ width: "200px", height: "250px" }}></img>
                                )
                                }
                                <div class="card-body" style={{backgroundColor:"#F5F5F5"}}>
                                    <h5 class="card-title text-truncate ms-2" style={{color:"#808080"}}>{movie.originalTitleText.text}</h5>
                                    <p class="card-text text-truncate ms-2" style={{color:"#808080"}}>{movie.releaseYear ? movie.releaseYear.year : 'Unavailable'}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}
export default Search;