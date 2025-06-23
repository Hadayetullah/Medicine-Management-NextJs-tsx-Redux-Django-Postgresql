import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface MainStateType {
    isNavbarHidden: boolean;
};

const initialState: MainStateType = {
    isNavbarHidden: false,
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        handleNavbarVisibility: (state, action: PayloadAction<boolean>) => {
            state.isNavbarHidden = action.payload;
        },
    },
});

export const {handleNavbarVisibility,} = commonSlice.actions;

export default commonSlice.reducer;