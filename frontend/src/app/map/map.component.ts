import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // Queen's University
  lat = 44.2253
  lng = -76.4951
  questions: any

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.auth()
    this.apiService.getQuestions().subscribe((data: any) => {
      this.questions = data.questions
      console.log(this.questions)
    })
  }

}
