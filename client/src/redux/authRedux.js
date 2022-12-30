import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        success: false,
    },
    reducers: {
        // register
        registerStart: (state) => {
            state.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.success = true;
            state.error = false;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.success = false;
            state.error = true;
        },

        // login
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },

        // logout
        logoutStart: (state) => {
            state.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
        },
        logoutFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // update user
        updateStart: (state) => {
            state.isFetching = true;
        },

        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        updateFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    registerStart,
    registerSuccess,
    registerFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    updateStart,
    updateSuccess,
    updateFailure,
} = authSlice.actions;
export default authSlice.reducer;
