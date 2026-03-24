import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/resumes/`;

// Get user resumes
export const getResumes = createAsyncThunk('resumes/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch resumes';
        return thunkAPI.rejectWithValue(message);
    }
});

// Create resume
export const createResume = createAsyncThunk('resumes/create', async (resumeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(API_URL, resumeData, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to save resume';
        return thunkAPI.rejectWithValue(message);
    }
});

// Update resume
export const updateResume = createAsyncThunk('resumes/update', async ({ id, resumeData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(API_URL, resumeData, config); // Ideally should be PUT, but using POST as per existing pattern or stick to logical API
        // NOTE: The previous controller uses POST for create/update universal, but let's assume we might need specific ID handling. 
        // Current backend route '/' is POST for create/update.
        // Let's stick to the existing backend logic: POST /api/resumes/ handles both if ID is present or handled in body?
        // Wait, looking at resumeController.js earlier: "if (req.body._id) ... update ... else ... create"
        // So passing resumeData with _id is enough for POST.

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update resume';
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete resume
export const deleteResume = createAsyncThunk('resumes/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(API_URL + id, config);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete resume';
        return thunkAPI.rejectWithValue(message);
    }
});

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumes: [],
        resume: null, // Current active resume
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    },
    reducers: {
        resetResume: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResumes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getResumes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.resumes = Array.isArray(action.payload) ? action.payload : [action.payload];
            })
            .addCase(getResumes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.resume = action.payload; // Set current
                state.resumes.push(action.payload);
            })
            .addCase(updateResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.resume = action.payload;
                // Update in list
                const index = state.resumes.findIndex(r => r._id === action.payload._id);
                if (index !== -1) {
                    state.resumes[index] = action.payload;
                }
            })
            .addCase(deleteResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.resumes = state.resumes.filter((resume) => resume._id !== action.payload);
            });
    },
});

export const { resetResume } = resumeSlice.actions;
export default resumeSlice.reducer;
