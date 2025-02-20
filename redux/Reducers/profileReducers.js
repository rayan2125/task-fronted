import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'Auth',
    initialState: {
        isLoggedIn: false,
        authData: null,
        token:null,
    },
    reducers: {
        setAuthdata(state, action) {
            state.isLoggedIn = true;
            state.authData = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.authData = null;
        },
        tokens(state,action){
            state.token=action.payload
        }
       
    },
});



export const { setAuthdata, logout,tokens } = profileSlice.actions;


export default profileSlice.reducer;
