import { gameReducers } from 'containers/GamesPage';
import { reducerHome } from 'containers/Home';

const reducers = {
  homePage: reducerHome,
  games: gameReducers,
};

export default reducers;
