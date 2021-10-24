import React, { useState, useEffect } from "react";
import AddNewComment from "./addNewComment";
import CommentsList from "./commentsList";
import PropTypes from "prop-types";
import api from "../../../api";

const CommentBox = ({ userId, users }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then(data => {
            setComments(data);
            console.log(data);
        });
    }, []);

    const handleRemoveComment = id => {
        api.comments.remove(id).then(data => {
            setComments(comments.filter(comment => comment._id !== data));
        });
    };
    const handleAddComment = (data, validate) => {
        const isValidate = validate();
        if (!isValidate) return;
        console.log(data);
        api.comments.add(data).then(res => {
            console.log([...comments, res]);
            setComments([...comments, res]);
        });
    };

    return (
        <>
            <AddNewComment
                users={users}
                onAdd={handleAddComment}
                pageId={userId}
            />

            {comments.length > 0 && (
                <CommentsList
                    comments={comments}
                    onRemove={handleRemoveComment}
                    users={users}
                />
            )}
        </>
    );
};
CommentBox.propTypes = {
    users: PropTypes.array,
    userId: PropTypes.string
};
export default CommentBox;
