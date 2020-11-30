import { Pin } from 'src/app/model/pin.model';
import * as MapActions from '../actions/map.actions';

export interface CenterCoordinates {
    longitude: number;
    latitude: number;
}

export interface MapState {
  centerCoordinates: CenterCoordinates;
  highlightedPinId: number;
}

const initialState: MapState = {
  centerCoordinates: {
      longitude: null,
      latitude: null
  },
  highlightedPinId: null
};

export function mapReducer(state = initialState, action: MapActions.MapActions) {
  switch (action.type) {
    case MapActions.SET_CENTER_COORDINATES: {
      return {
        ...state,
        centerCoordinates: action.payload
      };
    }
    case MapActions.SET_HIGHLIGHTED_PIN_ID: {
      return {
        ...state,
        highlightedPinId: action.payload
      };
    }
    default:
      return state;
  }
}
