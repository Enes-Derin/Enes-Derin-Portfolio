import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiInstance, { postMultipart } from '../api/apiInstance';

export const fetchAllProjects = createAsyncThunk(
    'project/fetchAll',
    async () => {
        const res = await apiInstance.get('/project/all');
        return res.data.payload;
    }
);

export const createProject = createAsyncThunk(
    'project/create',
    async (formData) => postMultipart('/project/admin', formData)
);

export const updateProject = createAsyncThunk(
    'project/update',
    async ({ id, formData }) =>
        postMultipart(`/project/admin/${id}`, formData)
);

export const deleteProject = createAsyncThunk(
    'project/delete',
    async (id) => {
        await apiInstance.delete(`/project/admin/${id}`);
        return id;
    }
);

const projectSlice = createSlice({
    name: 'project',
    initialState: { list: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                const i = state.list.findIndex(p => p.id === action.payload.id);
                if (i !== -1) state.list[i] = action.payload;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.list = state.list.filter(p => p.id !== action.payload);
            });
    },
});

export default projectSlice.reducer;
