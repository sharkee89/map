import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { MapConstructor } from '../model/map-contructor';
import { CenterCoordinates, MapState } from '../store/reducers';
import * as Selectors from '../store/selectors';
import { takeLast } from 'rxjs/operators';
import * as fromApp from '../store/reducers';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // map: MapConstructor;

  constructor(
    private store: Store<MapState>,
    private mapService: MapService
  ) {
    // this.map = new MapConstructor(this.mapService);
  }

  ngOnInit() {
    this.getCenterCoordinates();
  }

  private getCenterCoordinates(): void {
    this.store.select(Selectors.getCenterCoordinates)
      .pipe(takeLast(1))
      .subscribe((centerCoordinates: CenterCoordinates) => {

      });
  }

}
