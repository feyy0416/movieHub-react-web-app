import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function MyProfile() {
    const [account, setAccount] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);
    const [follows, setFollows] = useState([]);
    const fetchAccount = async () => {
        try {
            const account = await client.account();
            const comments = await client.findCommentsByUsername(account.username);
            setAccount(account);
            setComments(comments);
            if (account) {
                const likes = await client.findMoviesThatUserLikes(account._id);
                setLikes(likes);

                const followers = await client.findFollowers(account.username);
                setFollowers(followers);

                const follows = await client.findFollows(account._id);
                setFollows(follows);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const save = async () => {
        await client.updateUser(account);
    };

    const logout = async () => {
        await client.logout();
        navigate("/Moviehub/Login");
    };

    useEffect(() => {
        fetchAccount();
    }, []);
    return (
        <div className="w-50 mb-4" style={{ margin: "0 auto", color: "#808080" }}>
            <FaRegUserCircle className="mt-2" size={100} style={{ color: "#808080" }} />
            {account ? (
                <div>
                    <div>
                        <p className="fw-bold fs-2">Welcome! {account.username} </p>
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            value={account.password}
                            className="form-control mt-2"
                            placeholder="password"
                            onChange={(e) => setAccount({ ...account, password: e.target.value })}
                        />

                        <label htmlFor="firstName" className="mt-2">First Name:</label>
                        <input
                            id="firstName"
                            value={account.firstName}
                            className="form-control mt-2"
                            placeholder="first name"
                            onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
                        />

                        <label htmlFor="lastName" className="mt-2">Last Name:</label>
                        <input
                            id="lastName"
                            value={account.lastName}
                            className="form-control mt-2"
                            placeholder="last name"
                            onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
                        />

                        <label htmlFor="dob" className="mt-2">Date of Birth:</label>
                        <input
                            id="dob"
                            value={account.dob}
                            className="form-control mt-2"
                            placeholder="birthday"
                            onChange={(e) => setAccount({ ...account, dob: e.target.value })}
                        />

                        <label htmlFor="email" className="mt-2">Email:</label>
                        <input
                            id="email"
                            value={account.email}
                            className="form-control mt-2"
                            placeholder="email"
                            onChange={(e) => setAccount({ ...account, email: e.target.value })}
                        />
                    </div>

                    <button onClick={save} className="btn btn-outline-secondary w-100 mt-2">
                        Save
                    </button>
                    <button className="btn btn-outline-secondary w-100 mt-2 mb-4" onClick={logout}>
                        Log Out
                    </button>

                    <hr />
                    <div>
                        <p className="fw-bold fs-4">Your Comments</p>
                        {
                            comments.map((comment, index) => (
                                <div className="list-group">
                                    <Link
                                        key={index}
                                        className="list-group-item list-group-item-dark mb-2 text-truncate"
                                        to={{
                                            pathname: `/Moviehub/movies/${comment.movieId}`,
                                        }}>
                                        {comment.content}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                    <hr />
                    <div>
                        <p className="fw-bold fs-4">Your Liked Movies</p>
                        {
                            likes.map((like, index) => (
                                <div className="list-group">
                                    <Link
                                        key={index}
                                        className="list-group-item list-group-item-dark mb-2 text-truncate"
                                        to={{
                                            pathname: `/Moviehub/movies/${like.movieId}`,
                                        }}>
                                        {like.movieName}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                    <hr />
                    <div>
                        <p className="fw-bold fs-4">Following</p>
                        {
                            follows.map((follow, index) => (
                                <div className="list-group">
                                    <Link
                                        key={index}
                                        className="list-group-item list-group-item-dark mb-2 text-truncate"
                                        to={{
                                            pathname: `/Moviehub/user/${follow.followedUser}`,
                                        }}>
                                        {follow.followedUser}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                    <hr />
                    <div>
                        <p className="fw-bold fs-4">Followers</p>
                        {
                            followers.map((follower, index) => (
                                <div className="list-group">
                                    <Link
                                        key={index}
                                        className="list-group-item list-group-item-dark mb-2 text-truncate"
                                        to={{
                                            pathname: `/Moviehub/user/${follower.username}`,
                                        }}>
                                        {follower.username}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>


                    {account.role === "ADMIN" && (
                        <div>
                            <hr />
                            <p className="fw-bold fs-4">Admin Feature</p>
                            <Link to="/Moviehub/Admin/UsersManagement" className="btn btn-outline-secondary mt-2">
                                Users Management
                            </Link>
                        </div>
                    )}
                </div>
            ) : <p className="fw-bold fs-2">Hello! Guest! <br /> Login for access to all features!</p>}
        </div>
    );
}
export default MyProfile;