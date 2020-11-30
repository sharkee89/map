import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Agent } from '../model/agent.model';
import { Filter, FilterConfig } from '../model/filter-config.model';
import { MapService } from '../services/map/map.service';
import { CenterCoordinates, MapState } from '../store/reducers';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() agent: Agent;
  @Input() filterConfig: FilterConfig;
  @Input() maxPrice: number;
  @Input() maxBed: number;
  @Output() filterSet = new EventEmitter<Filter>();

  centerCoordinates: CenterCoordinates;
  selectedFilter: FilterConfig;
  filterValue: Filter;

  constructor(
    private store: Store<MapState>,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.initFilterValue();
    this.initCenterCoordinates();
  }

  onCenterMapClick(): void {
    this.mapService.flyTo(this.centerCoordinates.longitude, this.centerCoordinates.latitude);
    this.store.dispatch(new Actions.SetHighlightedPinId(null));
  }

  setFilter(): void {
    this.filterSet.emit(this.filterValue);
  }

  setSelectedFilter(filter): void {
    if (this.selectedFilter && (this.selectedFilter.type === filter.type)) {
      this.selectedFilter = null;
    } else {
      this.selectedFilter = filter;
    }
  }

  setSelectedRooms(value: number): void {
    if (this.filterValue.selectedRooms.includes(value)) {
      this.filterValue.selectedRooms.splice(this.filterValue.selectedRooms.indexOf(value), 1);
    } else {
      this.filterValue.selectedRooms.push(value);
    }
  }

  private initCenterCoordinates(): void {
    this.store.select(Selectors.getCenterCoordinates)
      .pipe(take(1))
      .subscribe((cCor) => {
        this.centerCoordinates = cCor;
      });
  }

  private initFilterValue(): void {
    this.filterValue = {
      priceRange: this.maxPrice,
      selectedRooms: [...Array(this.maxBed + 1).keys()]
    };
  }

}
