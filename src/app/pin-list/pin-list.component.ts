import { Component, Input, OnInit } from '@angular/core';
import { Pin } from '../model/pin.model';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent implements OnInit {

  @Input() pins: Pin[];

  constructor() { }

  ngOnInit() {
  }

}
