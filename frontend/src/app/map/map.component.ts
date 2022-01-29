import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // Queen's University
  lat = 44.2253; 
  lng = -76.4951;

  constructor() { }

  ngOnInit(): void {
  }

}
