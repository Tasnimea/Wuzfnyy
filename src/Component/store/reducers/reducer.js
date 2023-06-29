const INITAL_STATE = {
  favMovies: [],
  singleJobR:{},
  counter: 0,
};

//action //data
export default function favReducer(state = INITAL_STATE, action) {
  switch (action.type) {
    case "FAV_MOVIES":
      state.favMovies.push(action.payload);
      return {
        ...state,
        counter: state.favMovies.length,
      };
    case "FavouriteStoreArray":
      state.favMovies = new Array(...action.payload);
      return {
        ...state,
        counter: state.favMovies.length,
      };
      case "SingleJobReducer":
      state.singleJobR = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}
