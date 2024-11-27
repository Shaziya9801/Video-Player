import { createStore } from 'redux';

const initialState = {
  videos: [],
  selectedVideo: null,
  viewMode: 'list' 
};

const ADD_VIDEO = 'ADD_VIDEO';
const SET_VIEW_MODE = 'SET_VIEW_MODE';
const SET_SELECTED_VIDEO = 'SET_SELECTED_VIDEO';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.payload]
      };
    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload
      };
    case SET_SELECTED_VIDEO:
      return {
        ...state,
        selectedVideo: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

export const addVideo = (video) => ({
  type: ADD_VIDEO,
  payload: video
});

export const setViewMode = (mode) => ({
  type: SET_VIEW_MODE,
  payload: mode
});

export const setSelectedVideo = (video) => ({
  type: SET_SELECTED_VIDEO,
  payload: video
});
