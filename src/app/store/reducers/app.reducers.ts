import { ActionReducerMap } from '@ngrx/store';

import * as fromMap from './map.reducers';

export interface AppState {
  map: fromMap.MapState;
}

export const appReducers: ActionReducerMap<AppState> = {
  map: fromMap.mapReducer,
};
