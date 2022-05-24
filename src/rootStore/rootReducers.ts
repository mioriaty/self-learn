import { chatReducer } from 'containers/Chat';
import { gameReducers } from 'containers/GamesPage';
import { reducerHome } from 'containers/Home';

const reducers = {
  homePage: reducerHome,
  games: gameReducers,
  chat: chatReducer,
};

export default reducers;
