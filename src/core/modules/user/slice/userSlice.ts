import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType = {
    id?: string;
    username?: string;
}

const initialState: UserStateType = { };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserStateType>) => {
            state = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;