import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  DeleteUserPayload,
  User,
} from "./authTypes";
import {
  deleteUser,
  fetchAllUsers,
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./authTunks";

// ---------- Initial State ----------

const initialState: AuthState = {
  user: null,
  users: [],
  loading: false,      // general loading
  usersLoading: false, // fetchAllUsers loading
  error: null,
  success: false,
  isAuthenticated: false,
  logoutSuccess: false,
  hydrated: false,
};

// ---------- Slice ----------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.success = false;
    },
    clearLogoutSuccess(state) {
      state.logoutSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // -------- register -----------
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Register failed";
      state.isAuthenticated = false;
    });

    // -------- login -----------
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
      state.isAuthenticated = true;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Login failed";
      state.isAuthenticated = false;
    });

    // -------- logout -----------
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.logoutSuccess = true;
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Logout failed";
      state.logoutSuccess = false;
    });

      // -------- fetch all users -----------
  builder.addCase(fetchAllUsers.pending, (state) => {
  state.usersLoading = true;
  state.error = null;
});

builder.addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
  state.usersLoading = false;
  state.users = action.payload || [];
});

builder.addCase(fetchAllUsers.rejected, (state, action) => {
  state.usersLoading = false;
  state.error = action.payload || "Failed to fetch users";
});


    // -------- fetch current user -----------
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.hydrated = true; 
      }
    );

    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.user = null; // logged out
      state.isAuthenticated = false;
      state.error = null;
       // prevent showing error toast on login page
       state.hydrated = true;
    });

    // -------- delete user -----------
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<DeleteUserPayload>) => {
        state.loading = false;
        if (state.user && state.user._id === action.payload.userId) {
          state.user = null;
          state.isAuthenticated = false;
        }
        state.success = true;
      }
    );

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "User failed to delete";
    });
  },
});

// ---------- Export ----------
export const { clearError, clearSuccess, clearLogoutSuccess } = authSlice.actions;
export default authSlice.reducer;
