import { Action } from '@ngrx/store';
import { Pin } from 'src/app/model/pin.model';
import { CenterCoordinates } from '../reducers';

export const SET_CENTER_COORDINATES = 'SET_CENTER_COORDINATES';
export const SET_HIGHLIGHTED_PIN_ID = 'SET_HIGHLIGHTED_PIN_ID';

export class SetCenterCoordinates implements Action {
  readonly type = SET_CENTER_COORDINATES;

  constructor(public payload: CenterCoordinates) {}
}

export class SetHighlightedPinId implements Action {
  readonly type = SET_HIGHLIGHTED_PIN_ID;

  constructor(public payload: number) {}
}

export type MapActions =
    SetCenterCoordinates |
    SetHighlightedPinId;
