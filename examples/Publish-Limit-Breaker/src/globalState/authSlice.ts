import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface authState{
  user: {name: string}|null
}
const initialState: authState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
