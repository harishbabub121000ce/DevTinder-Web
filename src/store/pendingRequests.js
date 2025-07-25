import { createSlice } from "@reduxjs/toolkit";

const pendingRequestsSlice = createSlice({
    name: "pendingRequests",
    initialState: null,
    reducers: { 
        setPendingRequests: (state, action) => {
           return action.payload;
        },
    },
});

export const { setPendingRequests } = pendingRequestsSlice.actions;
export default pendingRequestsSlice.reducer;