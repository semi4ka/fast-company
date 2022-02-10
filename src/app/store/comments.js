import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateFailed = createAction("comments/commentCreateFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveFailed = createAction("comments/commentRemoveFailed");

export const removeComment = (id) => async (dispatch, getState) => {
    const state = getState();
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(
                commentRemoved(
                    state.comments.entities.filter(
                        (comment) => comment._id !== id
                    )
                )
            );
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.message));
    }
};

export const createComment =
    ({ payload, userId, currentUserId }) =>
    async (dispatch) => {
        const comment = {
            ...payload,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid()
        };
        dispatch(commentCreateRequested());
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreateFailed(error.message));
        }
    };
export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
