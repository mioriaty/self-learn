import { gameReducers } from 'containers/Games';
import { reducerHome } from 'containers/Home';

const reducers = {
  homePage: reducerHome,
  games: gameReducers,
};

export default reducers;
