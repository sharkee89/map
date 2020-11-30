
import { MapService } from '../services/map/map.service';
import { MapConstructorInterace } from './map-constructor-interface';

export class MapConstructor implements MapConstructorInterace {

    constructor(
        private mapService: MapService
    ) { }

    buildMap = (longitude, latitude, style) => {
        this.mapService.buildMap(longitude, latitude, style);
    }
}
