import React, { useState, useEffect } from "react";
import axios from "axios";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

function CommentBox(props) {
    const userId = localStorage.getItem("userId");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(3);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/postcomment/${props.filmid}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [props.filmid, refresh]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Make an Axios POST request to submit a new comment
        try {
            const response = await axios.post("http://localhost:5000/api/postcomment", {
                userId: userId,
                filmid: props.filmid,
                comment: comment,
            });

            console.log("Comment submitted successfully:", response.data);
            setRefresh(!refresh);

            // Clear the comment input after submission
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleViewMore = () => {
        setVisibleComments(visibleComments + 3);
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    id="userComment"
                                    rows={3}
                                    placeholder="Write your comment here..."
                                    required
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4 mt-md-0">
                                Submit Comment
                            </button>
                        </form>
                    </div>
                </div>

                <h2>Movie Comments</h2>

                {/* Display fetched comments or "No comments yet" message */}
                {comments.length > 0 ? (
                    <>
                        {comments.slice(0, visibleComments).map((commentData) => (
                            <div className="card mb-3" key={commentData.commentId}>
                                <div className="card-body">
                                    <div className="avatar avatar-md">
                                        <img
                                            src={"assets/images/faces/1.jpg"}
                                            alt="Profile Picture"
                                            className="rounded-circle"
                                        />
                                        <div style={{ marginLeft: "20px", textAlign: "left" }}>
                                            <h6 className="card-title">{commentData.userId.username}</h6>
                                            <p className="card-text">{commentData.comment}</p>
                                        </div>
                                    </div>

                                    {/* Display date and time on the right side */}
                                    <div className="text-right" style={{ flex: "1", textAlign: "right" }}>
                                        <p>{formatDate(commentData.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {comments.length > visibleComments && (
                            <button className="btn btn-link" onClick={handleViewMore}>
                                View More
                            </button>
                        )}
                    </>
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
}

export default CommentBox;
