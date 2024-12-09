import { createSlice } from "@reduxjs/toolkit";

interface testSliceProps {
    testValue: boolean;
}

const initialState:testSliceProps = {
    testValue: false
}
const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {},
})

export default testSlice.reducer;