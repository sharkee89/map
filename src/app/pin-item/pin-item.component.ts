import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pin } from '../model/pin.model';
import { MapService } from '../services/map/map.service';
import { MapState } from '../store/reducers';
import * as Actions from '../store/actions';

@Component({
  selector: 'app-pin-item',
  templateUrl: './pin-item.component.html',
  styleUrls: ['./pin-item.component.scss']
})
export class PinItemComponent implements OnInit {

  @Input() pin: Pin;
  selected: boolean;

  constructor(
    private store: Store<MapState>,
    private mapService: MapService
  ) { }

  ngOnInit() {

  }

  onPinItemClick(pin: Pin): void {
    this.store.dispatch(new Actions.SetHighlightedPinId(pin.propertyID));
    this.mapService.flyTo(pin.geocode.Longitude, pin.geocode.Latitude, 15);
  }

}
