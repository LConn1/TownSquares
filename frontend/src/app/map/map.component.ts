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

  currentPoll: any = {
    question: "",
    option1: "",
    option2: "",
    option3: ""
  }
  coordinates: Array<[number, number, string]> = [];

  constructor(private apiService: ApiService) { }

  public show = true;

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  ngOnInit(): void {
    this.apiService.auth()
    this.apiService.getQuestions().subscribe((data: any) => {

      this.questions = data.questions

      // Set location of questions on the map
      this.coordinates = [];
      for (var i = 0; i < data.questions.length; i++)
      {
        this.coordinates = this.coordinates.concat(
          [
            [   
              data.questions[i].gps_coordinates.split(",")[1],
              data.questions[i].gps_coordinates.split(",")[0],
              data.questions[i].question_text
            ]
          ]
        );
      }

      console.log("Coordinates array is: ", this.coordinates);
      console.log(this.questions)
      this.openPoll();  // temporary

      this.reload();
    })    
  }

  openPoll(): void {
    // replace hard coded question with the actual question that you clicked on
    this.currentPoll.question = this.questions[0].question_text
    this.currentPoll.option1 = this.questions[0].answer_options[0].option
    this.currentPoll.option2 = this.questions[0].answer_options[1].option
    this.currentPoll.option3 = this.questions[0].answer_options[2].option
    console.log(this.currentPoll);
    console.log(this.coordinates);
  }

  vote(event: any): void {
    console.log(event)
    this.apiService.postAnswer(event).subscribe((data: any) => {

    })
  }
}
