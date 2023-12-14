import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import noImg from '../../img/No_Picture.jpg';
import "./index.css";
import * as client from "./client.js"
import { FaRegUserCircle } from "react-icons/fa";
import { BsTrash3Fill, BsPencil } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loadingMovie, setloadingMovie] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({ username: "username", movieId: movieId, content: "" });
    const [account, setAccount] = useState(null);
    const [like, setLike] = useState(null);
    const [isLiked, setIsLiked] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchMovie();
                await fetchRating();
                await fetchUser(); 
                await fetchComments();
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message || 'An error occurred');
            } finally {
                setloadingMovie(false);
            }
        };
        fetchData();
    }, []);

    const fetchUser = async () => {
        try {
            const account = await client.account();
            setAccount(account);
            setComment({ ...comment, username: account.username });
            if (account) {
                const status = await client.findIfUserLikesMovie(account._id, movieId);
                console.log("Status", status);
                if (status !== null) {
                    setLike(true);
                    setIsLiked(true);
                } else {
                    setLike(false);
                    setIsLiked(false);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchRating = async () => {
        try {
            const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${movieId}/ratings`, {
                headers: {
                    'X-RapidAPI-Key': '94a78acc56msh72b893a664bbb2fp175749jsnf490594a83c5',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
                },
            });
            setRating(response.data.results);
            console.log("Rating fetched");
        } catch (error) {
            setError(error.message || 'An error occurred');
        }
    }

    const fetchMovie = async () => {
        try {
            const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${movieId}`, {
                headers: {
                    'X-RapidAPI-Key': '94a78acc56msh72b893a664bbb2fp175749jsnf490594a83c5',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
                },
            });

            setMovie(response.data.results);
            console.log(movie);
        } catch (error) {
            setError(error.message || 'An error occurred');
        }
    };

    const fetchComments = async () => {
        try {
            const response = await client.findCommentsByMovieId(movieId);
            setComments(response);
            console.log("Comments fetched");
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }


    const handlePost = async () => {
        try {
            const status = await client.createComment(comment);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteComment = async (comment) => {
        try {
            await client.deleteComment(comment);
            fetchComments();
        } catch (err) {
            console.log(err);
        }
    };

    const selectComment = async (comment) => {
        try {
            const c = await client.findCommentById(comment._id);
            console.log(comment.content);
            setComment(c);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        try {
            const status = await client.updateComment(comment);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const status = await client.createUserLikesMovie(account._id, movieId, movie.originalTitleText.text);
            setLike(true);
            setIsLiked(true);
            alert('You liked this movie!');
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            const status = await client.deleteUserLikesMovie(account._id, movieId);
            setLike(false);
            setIsLiked(false);
            alert('You unliked this movie.');
        } catch (err) {
            console.log(err);
        }
    };


    if (loadingMovie) {
        return <p className="fw-bold fs-2 w-100" style={{ textAlign: "center", color: "#808080" }}>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {/* <p>{account._id}</p>
            {isLiked===true ? (<p>True</p>):(<p>False</p>)} */}
            <div className="movie-details-container">
                <div className="row">
                    <div className="movie-poster col">
                        <img src={(movie.primaryImage && movie.primaryImage.url) ? movie.primaryImage.url : noImg} alt={movie.originalTitleText.text} />
                    </div>
                    <div className="movie-info col pt-5">
                        <h2>{movie.originalTitleText.text}
                            {account ? (
                                <button className={`btn border border-0 mb-1 ${isLiked ? 'text-danger' : 'text-grey'}`} onClick={isLiked ? handleUnlike : handleLike}><FaHeart className="p-0" size={30} /></button>
                            ) : (null)
                            }
                        </h2>
                        <div className="row">
                            <div className="col-4">Release Year:</div>
                            <div className="col-8">{movie.releaseYear ? movie.releaseYear.year : 'Unavailable'}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Type:</div>
                            <div className="col-8">{movie.titleType ? movie.titleType.id : 'Unavailable'}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Rating:</div>
                            <div className="col-8">{rating ? rating.averageRating : 'Unavailable'}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Popularity:</div>
                            <div className="col-8">{rating ? rating.numVotes : 'Unavailable'}</div>
                        </div>
                    </div>
                    {/* comments area */}

                    <div className="comments-section mt-5 ms-5">

                        <h3 className="h2 mb-4">Comments</h3>
                        {
                            comments.map((comment, index) => (
                                <div>
                                    <div className="bubble bubble-bottom-left mb-5">
                                        <p><Link
                                            key={index}
                                            to={{
                                                pathname: comment.username === account.username ? '/Moviehub/Profile' : `/Moviehub/user/${comment.username}`,
                                            }}>

                                            <FaRegUserCircle className="me-2 text-white" size={"1.5rem"} /></Link>
                                            <span className="pe-2">{comment.username} : {comment.content}</span>

                                            {account.username === comment.username ? (
                                                <button className="btn p-1" style={{ marginBottom: "6px" }}>
                                                    <BsPencil className="text-white" onClick={() => selectComment(comment)} /></button>
                                            ) : null}

                                            {account.role === "ADMIN" || account.role === "COMMENT_MANAGER" || account.username === comment.username ? (
                                                <button className={"btn p-1"} style={{ marginBottom: "6px" }}>
                                                    <BsTrash3Fill className="text-white" onClick={() => deleteComment(comment)} /></button>
                                            ) : null}
                                        </p>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    {account ? (
                        <form className="mb-4" style={{ maxWidth: "1100px", margin: "0 auto" }}>
                            <textarea
                                className="form-control"
                                placeholder="Add your comments here!"
                                rows="5"
                                value={comment.content}
                                onChange={(e) => setComment({ ...comment, content: e.target.value })}
                            />
                            <button onClick={handlePost} className="btn btn-outline-secondary ms-2 mt-3 float-end">Post</button>
                            <button onClick={handleUpdate} className="btn btn-outline-secondary mt-3 float-end">Update</button>
                        </form>
                    ) : (
                        <div>
                            <p className="w-100" style={{ textAlign: "center" }}>Commenting is disabled for non-logged-in users. Please log in to leave a comment.</p>
                            <form className="mb-4" style={{ maxWidth: "1100px", margin: "0 auto" }}>
                                <textarea
                                    className="form-control"
                                    placeholder="Add your comments here!"
                                    rows="5"
                                    onChange={(e) => setComment({ ...comment, content: e.target.value })}
                                    disabled
                                />
                                <button disabled className="btn btn-outline-secondary mt-3 float-end">Post</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;