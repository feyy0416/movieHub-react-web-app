import * as client from "./client";
import { useState, useEffect } from "react";
import "./index.css";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function UserProfile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [account, setAccount] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [isFollowed, setIsFollowed] = useState();
    const [followers, setFollowers] = useState([]);
    const [follows, setFollows] = useState([]);

    const fetchUser = async () => {
        try {

            const account = await client.account();
            setAccount(account);
            const user = await client.findUserByUsername(username);
            const comments = await client.findCommentsByUsername(username);
            setUser(user);
            setComments(comments);
            if (user) {
                const likes = await client.findMoviesThatUserLikes(user._id);
                setLikes(likes);

                const status = await client.findIfUserFollowedUser(account._id, username);
                if (status !== null) {
                    setIsFollowed(true);
                } else {
                    setIsFollowed(false);
                }

                const followers = await client.findFollowers(user.username);
                setFollowers(followers);

                const follows = await client.findFollows(user._id);
                setFollows(follows);

            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleFollow = async () => {
        try {
            const status = await client.createUserFollowsUser(account._id, username, account.username);
            setIsFollowed(true);
            alert('You followed this user!');
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnfollow = async () => {
        try {
            const status = await client.deleteUserFollowsUser(account._id, username);
            setIsFollowed(false);
            alert('You unfollowed this user.');
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="content-container pb-4">
            {account ? (
                <button
                    className={`btn border border-0 mb-1 float-end ${isFollowed ? 'text-warning' : 'text-grey'}`}
                    onClick={isFollowed ? handleUnfollow : handleFollow}>
                    <FaStar className="p-0" size={30} />
                </button>
            ) : (null)
            }
            <div className="d-flex justify-content-evenly">
                <FaRegUserCircle className="mt-4" size={100} style={{ color: "#808080" }} />
                <div className="row mt-4 ms-4">
                    <div className="col">
                        <p className="fw-bold">Username: </p>
                        <p className="fw-bold">Email :</p>
                        <p className="fw-bold">birthday :</p>
                    </div>
                    <div className="col">
                        <p>{user && user.username}</p>
                        <p>{user && user.email}</p>
                        <p>{user && user.dob}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <p className="fw-bold w-100" style={{ textAlign: "center" }}>User's Comments</p>
                {
                    comments.map((comment, index) => (
                        <div className="list-group w-75" style={{ margin: "0 auto" }}>
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
                <p className="fw-bold w-100" style={{ textAlign: "center" }}>User Liked Movies</p>
                {
                    likes.map((like, index) => (
                        <div className="list-group w-75" style={{ margin: "0 auto" }}>
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
                        <p className="fw-bold w-100" style={{ textAlign: "center" }}>Following</p>
                        {
                            follows.map((follow, index) => (
                                <div className="list-group w-75" style={{ margin: "0 auto" }}>
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
                        <p className="fw-bold w-100" style={{ textAlign: "center" }}>Followers</p>
                        {
                            followers.map((follower, index) => (
                                <div className="list-group w-75" style={{ margin: "0 auto" }}>
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
        </div>
    );
}
export default UserProfile;