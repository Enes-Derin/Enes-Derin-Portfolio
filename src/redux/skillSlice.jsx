import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiInstance from '../api/apiInstance';

export const fetchSkills = createAsyncThunk(
    'skill/fetchAll',
    async () => {
        const res = await apiInstance.get('/skills');
        return res.data.payload;
    }
);

export const createSkill = createAsyncThunk(
    'skill/create',
    async (formData) => {
        const res = await apiInstance.post('/skills/admin', formData);
        return res.data.payload;
    }
);

export const updateSkill = createAsyncThunk(
    'skill/update',
    async ({ id, formData }) => {
        const res = await apiInstance.put(`/skills/admin/${id}`, formData);
        return res.data.payload;
    }
);

export const deleteSkill = createAsyncThunk(
    'skill/delete',
    async (id) => {
        await apiInstance.delete(`/skills/admin/${id}`);
        return id;
    }
);

const skillSlice = createSlice({
    name: 'skill',
    initialState: { list: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(createSkill.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateSkill.fulfilled, (state, action) => {
                const i = state.list.findIndex(s => s.id === action.payload.id);
                if (i !== -1) state.list[i] = action.payload;
            })
            .addCase(deleteSkill.fulfilled, (state, action) => {
                state.list = state.list.filter(s => s.id !== action.payload);
            });
    },
});

export default skillSlice.reducer;
