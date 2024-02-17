import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentuser:null,
    error:null,
    loading:false
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state) =>{
            state.loading = true;
        },
        signInSucess:(state,action)=>{
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false
        }
    }
})

export const {signInStart,signInSucess, signInFailure} = userSlice.actions

export default userSlice.reducer