import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        users: [],
        usersPage: 0,
        userProfile: {},
    },
    reducers: {
        addAuthorizedUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {};
            state.users = [];
        },
        addFetchedUsers: (state, action) => {
            const newUsers = action.payload.users.filter(newUser =>
                !state.users.some(existingUser => existingUser._id === newUser._id)
            );
            state.users = [...state.users, ...newUsers];
            state.usersPage = action.payload.page;
        },
        addUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        editUserProfile: (state, action) => {
            state.userProfile = {
                ...state.userProfile,
                ...action.payload,
            };
        },
    },
});

export const { addAuthorizedUser, clearUser, addFetchedUsers, addUserProfile, editUserProfile } = userSlice.actions;
export default userSlice.reducer;
