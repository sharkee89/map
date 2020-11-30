import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../reducers/index';

export const selectCoreState = createFeatureSelector<fromApp.MapState>('map');
export const getCenterCoordinates = createSelector(selectCoreState, (state: fromApp.MapState) => state.centerCoordinates);
export const getHighlightedPinId = createSelector(selectCoreState, (state: fromApp.MapState) => state.highlightedPinId);
