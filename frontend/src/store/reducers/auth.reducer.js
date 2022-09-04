const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, user: {} },
    reducers: {
        LOGIN_SUCCESS: (auth, action) => {
            return { ...auth, isLoggedIn: true, user: action.payload };
        },
        LOGIN_FAIL: (auth, action) => {
            return { ...auth, isLoggedIn: false, user: {} };
        },
        LOGOUT: (auth, action) => {
            return { isLoggedIn: false, user: {} };
        },
    },
});

export const { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
