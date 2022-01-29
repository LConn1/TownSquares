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
  coordinates: Array<[number, number, string]> = [[-76.4951, 44.2253, "Pro-Vax"],
                                                  [-76.4951, 44.25, "Anti-Vax"],
                                                  [-76.4951, 44.3, "Anti-Vax"],
                                                  [-76.4951, 44.4, "Pro-Vax"]];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.auth()
    this.apiService.getQuestions().subscribe((data: any) => {
      this.questions = data.questions
      console.log(this.questions)
      this.openPoll();  // temporary
    })    
  }

  openPoll(): void {
    // replace hard coded question with the actual question that you clicked on
    this.currentPoll.question = this.questions[0].question_text
    this.currentPoll.option1 = this.questions[0].answer_options[0].option
    this.currentPoll.option2 = this.questions[0].answer_options[1].option
    this.currentPoll.option3 = this.questions[0].answer_options[2].option
    console.log(this.currentPoll)
  }

  vote(event: any): void {
    console.log(event)
    this.apiService.postAnswer(event).subscribe((data: any) => {

    })
  }
}
