import axiosInstance from "@/api/axiosIntance"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { DeleteUserPayload, LoginCredentials, User } from "./authTypes"

//--------------register----------------------

export const registerUser = createAsyncThunk<User,FormData,{rejectValue:string}>(
  'auth/registerUser',
  async (formData:FormData, { rejectWithValue }) => {
   
    try {
      const response = await axiosInstance.post('/users/register',formData)
      return response.data.user as User
    } catch (err) {

        let errorMessage='Register failed'

        if(axios.isAxiosError(err)){
            errorMessage=err.response?.data?.message || errorMessage
        }
      
      return rejectWithValue( errorMessage)
    }
  },
)

//----------------------login-----------------

export const loginUser = createAsyncThunk<User,LoginCredentials,{rejectValue:string}>(
  'auth/loginUser',
  async (credentials:LoginCredentials, { rejectWithValue }) => {
   
    try {
      const response = await axiosInstance.post('/users/login',credentials)
      console.log('login res',response)
      return response.data.user as User
    } catch (err) {
      let errorMessage='Login failed'
      if(axios.isAxiosError(err)){
        errorMessage=err.response?.data?.message || errorMessage
      }
      return rejectWithValue(errorMessage)
    }
  },
)

//----------------------logout---------------

export const logoutUser = createAsyncThunk<boolean,void,{rejectValue:string}>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
   
    try {
     await axiosInstance.post('/users/logout')
      return true
    } catch (err) {
     let errorMessage='Logout failed'

     if(axios.isAxiosError(err)){
        errorMessage=err.response?.data?.message || errorMessage
     }
      return rejectWithValue(errorMessage)
    }
  },
)

// ----------------- fetch all users -----------------
export const fetchAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/all-users"); 
      console.log('thunks res',response.data);
      if (response.data.success) {
      return response.data.allUsers as User[]; 
    }
     return rejectWithValue("Failed to fetch users");
     
    } catch (err) {
      let errorMessage = "Failed to fetch users";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// ------------fetch current user-------------

export const fetchCurrentUser = createAsyncThunk<User,void,{rejectValue:string}>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    
    try {
      const response = await axiosInstance.get('/users/get-profile')
      return response.data.user as User
    } catch (err) {
      let errorMessage='Failed to fetch user'

      if(axios.isAxiosError(err)){
        errorMessage=err.response?.data?.message || errorMessage
      }
       
      return rejectWithValue(errorMessage)
    }
  },
)

//-----------delete user-----------------

export const deleteUser = createAsyncThunk<DeleteUserPayload,string,{ rejectValue:string }>(
  'auth/deleteUser',
  async (userId, { rejectWithValue }) => {
   
    try {
      const response = await axiosInstance.delete(`users/delete/users/${userId}`)
      return {
        success:true,
        userId,
        message:response.data.message || 'User deleted successfully'
      } 
    } catch (err) {

      let errorMessage='User deleted failed'
     if(axios.isAxiosError(err)){
      errorMessage=err.response?.data?.message || errorMessage
     }
      return rejectWithValue(errorMessage)
    }
  },
)