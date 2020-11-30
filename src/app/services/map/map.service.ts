import * as mapboxgl from 'mapbox-gl';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import MapboxCircle from 'mapbox-gl-circle';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: mapboxgl.Map;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  public buildMap(longitude, latitude, style, zoom = 13, dragDisable = false, disableRotation = false) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style,
      zoom,
      center: [longitude, latitude]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    if (dragDisable) {
      this.map.dragRotate.disable();
    }
    if (disableRotation) {
      this.map.touchZoomRotate.disableRotation();
    }
  }

  public drawCircle(
    longitude: number,
    latitude: number,
    record,
    radius: number = environment.mapbox.circleRadius,
    color: string = environment.mapbox.circleFillColor,
    strokeColor: string = environment.mapbox.circleStrokeColor
  ): void {
    record.circle = new MapboxCircle({ lng: longitude, lat: latitude }, radius, {
      fillColor: color,
      strokeColor,
      strokeWeight: 2,
    }).addTo(this.map);
  }

  public flyTo(longitude, latitude, zoom = 13, enableAnimation = true): void {
    this.map.flyTo({
      center: [
        longitude,
        latitude
      ],
      zoom,
      essential: enableAnimation
    });
  }
}
