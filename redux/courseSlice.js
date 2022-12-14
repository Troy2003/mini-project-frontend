import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const courseSlice = createSlice({
    name: 'course',

    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    reducers: {
        setCourses(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
});


export const { setCourses, setStatus } = courseSlice.actions;


export { STATUSES };

export function fetchCourses() {
    return async function fetchCoursesThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const response = await axios.get('http://127.0.0.1:5000/api/course');
            dispatch(setCourses(response.data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

export default courseSlice.reducer;