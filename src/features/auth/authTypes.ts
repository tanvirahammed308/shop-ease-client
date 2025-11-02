export interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role?: string;
}

// -----------login-credentials---------------

export interface LoginCredentials {
  email: string;
  password: string;
}

// --------auth state-------------------

export interface AuthState {
  user: User | null;
  users: User[];
  loading: boolean;       // general loading (login/register/logout)
  usersLoading: boolean;  // fetchAllUsers loading
  error: string | null;
  success: boolean;
  isAuthenticated: boolean;
  logoutSuccess: boolean;
  hydrated: boolean;
}

//----------deleteUserPayload------------------

export interface DeleteUserPayload{
  success:boolean;
  userId:string;
  message?:string;



}