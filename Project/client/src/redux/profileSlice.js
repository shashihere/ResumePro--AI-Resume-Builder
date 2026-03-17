import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    profile: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get user profile
export const getMyProfile = createAsyncThunk('profile/getMe', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const response = await axios.get('http://localhost:5000/api/profile/me', config)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(getMyProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { resetProfile } = profileSlice.actions
export default profileSlice.reducer
