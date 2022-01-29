import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnyLayer } from 'mapbox-gl';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {

  @Input() question: any;
  @Input() option1: any;
  @Input() option2: any;
  @Input() option3: any;
  @Output() voteEmitter: EventEmitter<any> = new EventEmitter();

  currLat: any;
  currLon: any;

  questions: any;
  coordinates: Array<[number, number, string]> = [];


  ngOnInit(): void {
    
  }

  constructor(private apiService: ApiService) { }

  vote(option: any): void {
      navigator.geolocation.getCurrentPosition((coords: any) => {
        this.currLat = coords.coords.latitude;
        this.currLon = coords.coords.longitude;
        const answer = {
          poll_id: 123,
          option: option
        }
    
        this.apiService.auth()
        this.apiService.getQuestions().subscribe((data: any) => {
          for (var i = 0; i < data.questions.length; i++)
          {
    
            if (data.questions[i].question_text === this.question) {
              var d = data.questions[i].gps_coordinates.split(",");
              var qLon = +d[1];
              var qLat = +d[0];
              var radius = data.questions[i].answer_radius_km;
              var diffLon = qLon - this.currLon;
              var diffLat = qLat - this.currLat;
              var distance = Math.sqrt(diffLon * diffLon + diffLat * diffLat);
              distance *= 110;
              if (distance > radius) {
                console.log("TOO FAR TO ANSWER");
                console.log("Your coordinates are Lat: " + this.currLat + " Long:" + this.currLon);
                console.log("You're " + distance + " kilometres away from the question");
                break;
              }
              else {
                console.log("YOUR GOOD TO ANSWER");
                console.log("Your coordinates are Lat: " + this.currLat + " Long: " + this.currLon);
                console.log("You are " + distance + " kilometres away from the question");
                this.voteEmitter.emit(answer);
                break;
              }
            }
          }
        })  

      });
  }

}
