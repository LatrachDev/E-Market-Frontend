import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/categoryService";

export const fetchCategoriesAsync = createAsyncThunk("categories/fetchCategories", fetchCategories);
export const fetchCategoryAsync = createAsyncThunk("categories/fetchCategory", fetchCategoryById);
export const createCategoryAsync = createAsyncThunk("categories/createCategory", createCategory);
// export const updateCategoryAsync = createAsyncThunk("categories/updateCategory", updateCategory);
// export const deleteCategoryAsync = createAsyncThunk("categories/deleteCategory", deleteCategory);

export const updateCategoryAsync = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, categoryData }) => {
        return await updateCategory(id, categoryData);
    }
);

export const deleteCategoryAsync = createAsyncThunk(
    "categories/deleteCategory",
    async (id) => {
        return await deleteCategory(id);
    }
);

const slice = createSlice({
    name: "categories",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // create category
            .addCase(createCategoryAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createCategoryAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // update category
            .addCase(updateCategoryAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex(c => c._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // delete category
            .addCase(deleteCategoryAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter((category) => category._id !== action.payload._id);
            })
            .addCase(deleteCategoryAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },

});

export default slice.reducer;