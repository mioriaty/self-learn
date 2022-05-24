import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { SessionState, UserState } from './types';
import { UpdateSession, UpdateUserProfile, UpdateUserState, Logout } from './actions';

type AuthActions = UpdateSession | UpdateUserProfile | UpdateUserState | Logout;

interface AuthState {
  session: SessionState;
  loggedIn: boolean;
  user: UserState;
}

const initialState: AuthState = {
  user: {
    id: '',
    username: '',
    email: '',
    avatar_url: '',
    updated_at: '',
    phone: '',
    about: '',
  },
  session: {
    id: undefined,
    aud: '',
    username: '',
    email: '',
    role: '',
    phone: '',
    last_sign_in_at: '',
    email_confirmed_at: '',
    confirmed_at: '',
    user_metadata: {},
    app_metadata: {},
    created_at: '',
    updated_at: '',
    identities: [],
  },
  loggedIn: false,
};

export const userSlice = createSlice<AuthState, AuthActions>({
  initialState,
  name: '@Auth',
  reducers: [
    handleAction('updateSession', ({ state, action }) => ({ ...state, session: { ...state.session, ...action.payload }, loggedIn: true })),
    handleAction('updateUserProfile', ({ state, action }) => ({
      ...state,
      user: { ...state.user, ...action.payload },
    })),
    handleAction('updateUserState', ({ state, action }) => ({ ...state, user: { ...state.user, ...action.payload } })),
    handleAction('logout', ({ state }) => ({ ...state, user: initialState.user, session: initialState.session, loggedIn: false })),
  ],
});

export const { logout, updateSession, updateUserProfile, updateUserState } = userSlice.actions;

export const useLogout = createDispatchAction(logout);
export const useUpdateSession = createDispatchAction(updateSession);
export const useUpdateUserProfile = createDispatchAction(updateUserProfile);
export const useUpdateUserState = createDispatchAction(updateUserState);
