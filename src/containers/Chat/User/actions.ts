import { SessionState, UserState, UserProfile } from './types';

export interface UpdateSession {
  type: 'updateSession';
  payload: SessionState;
}

export interface UpdateUserState {
  type: 'updateUserState';
  payload: UserState;
}

export interface UpdateUserProfile {
  type: 'updateUserProfile';
  payload: UserProfile;
}

export interface Logout {
  type: 'logout';
}
