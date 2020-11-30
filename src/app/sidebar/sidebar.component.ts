import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as data from '../data/data.json';
import { FilterTypeEnum } from '../enums/filter-type.enum';
import { FilterConfig } from '../model/filter-config.model';
import { MapState } from '../store/reducers';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors';
import { environment } from 'src/environments/environment';
import { MapService } from '../services/map/map.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public apartmentData = data.default;
  longitudes = 0;
  latitudes = 0;
  length = 0;
  INIT_RECORDS = this.apartmentData.records;
  filterConfig: FilterConfig[] = [];
  maxPrice;
  maxBed;
  highlightID: number;

  constructor(
    private store: Store<MapState>,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.getFilters();
    this.subscribeToHighlightedPinId();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onFilterSet(filter): void {
    const tempRecords = [];
    this.INIT_RECORDS.filter((record, index) => {
      let result = false;
      record.floorplans.forEach(floorPlan => {
        if (floorPlan.price <= filter.priceRange) {
          result = true;
        }
      });
      if (result) {
        tempRecords.push(record);
      }
    });
    this.apartmentData = { ...this.apartmentData, records: tempRecords };
    if (filter.selectedRooms) {
      const tempBedRecords = [];
      this.apartmentData.records.filter((record) => {
        let result = false;
        record.floorplans.forEach(plan => {
          if (filter.selectedRooms.includes(plan.bedrooms)) {
            result = true;
          }
        });
        if (result) {
          tempBedRecords.push(record);
        }
      });
      this.apartmentData = { ...this.apartmentData, records: tempBedRecords };
    }
  }

  private getFilters(): void {
    let minPrice = 99999;
    this.maxPrice = 0;
    let minBed = 99999;
    this.maxBed = 0;
    this.apartmentData.records.forEach((record, index) => {
      if (index === 0) {
        this.initMapWithCoordinates(record.geocode.Longitude, record.geocode.Latitude);
      }
      this.longitudes += parseFloat(record.geocode.Longitude);
      this.latitudes += parseFloat(record.geocode.Latitude);
      this.length++;
      record.floorplans.forEach(floorplan => {
        if (floorplan.price < minPrice) {
          minPrice = floorplan.price;
        }
        if (floorplan.price > this.maxPrice) {
          this.maxPrice = floorplan.price;
        }
        if (floorplan.bedrooms < minBed) {
          minBed = floorplan.bedrooms;
        }
        if (floorplan.bedrooms > this.maxBed) {
          this.maxBed = floorplan.bedrooms;
        }
      });
      this.mapService.drawCircle(parseFloat(record.geocode.Longitude), parseFloat(record.geocode.Latitude), record);
    });
    this.setCenterCoordinates(this.longitudes / this.length, this.latitudes / this.length);
    this.addFilterConfig(FilterTypeEnum.SLIDER, 'Rent', minPrice, this.maxPrice);
    this.addFilterConfig(FilterTypeEnum.MULTISELECT, 'Bedrooms', minBed, this.maxBed);
  }

  private addFilterConfig(type: FilterTypeEnum, name: string, min: number, max: number): void {
    const values = [];
    if (type === FilterTypeEnum.MULTISELECT) {
      for (let i = 0; i <= max; i++) {
        values.push(i);
      }
    }
    this.filterConfig.push({ type, name, min, max, values });
  }

  private initMapWithCoordinates(longitude: number, latitude: number): void {
    this.store.dispatch(new Actions.SetCenterCoordinates({ longitude, latitude }));
    this.mapService.buildMap(longitude, latitude, environment.mapbox.style, 12, true, true);
  }

  private setCenterCoordinates(longitude: number, latitude: number): void {
    this.store.dispatch(new Actions.SetCenterCoordinates({ longitude, latitude }));
    this.mapService.flyTo(longitude, latitude, 12);
  }

  private subscribeToHighlightedPinId(): void {
    this.store.select(Selectors.getHighlightedPinId)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(id => {
      let record;
      if (this.highlightID) {
        record = this.apartmentData.records.find((r) => r.propertyID === this.highlightID);
        record.selected = false;
        record.circle.remove();
        this.mapService.drawCircle(
          parseFloat(record.geocode.Longitude),
          parseFloat(record.geocode.Latitude), record, 150, environment.mapbox.circleFillColor, environment.mapbox.circleStrokeColor);
      }
      if (id) {
        record = this.apartmentData.records.find((r) => r.propertyID === id);
        record.selected = true;
        record.circle.remove();
        this.mapService.drawCircle(
          parseFloat(record.geocode.Longitude),
          parseFloat(record.geocode.Latitude), record, 150, '#00FF00', '#00FF00');
      }
      this.highlightID = id;
    });
  }

}
