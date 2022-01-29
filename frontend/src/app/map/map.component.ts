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
  username: any
  tempUsername: any
  bio: any
  viewQuestion: any

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
    this.getQuestions()
  }

  getQuestions(): void {
    this.apiService.getQuestions().subscribe((data: any) => {

      this.questions = data.questions

      let temp: any = []
      this.questions.forEach((q:any) => {
        q.coords = [q.gps_coordinates.split(",")[1], q.gps_coordinates.split(",")[0]]
        temp.push(q)
      })
      this.questions = temp

      this.reload();
    })    
  }

  openPoll(q: any): void {
    console.log(q)
    this.viewQuestion = {
      question: q.question_text,
      option1: q.answer_options[0],
      option2: q.answer_options[1],
      option3: q.answer_options[2],
      username: q.username,
      id: q._id,
      voters: q.users_voted
    }
  }

  vote(event: any): void {
    console.log(event)
    console.log(this.username)
    const body = {
      username: this.username,
      question_id: event._id,
      answer_chosen: event.option
    }
    this.apiService.postAnswer(body).subscribe((data: any) => {
      this.apiService.getQuestions().subscribe((data: any) => {

        this.questions = data.questions
  
        let temp: any = []
        this.questions.forEach((q:any) => {
          q.coords = [q.gps_coordinates.split(",")[1], q.gps_coordinates.split(",")[0]]
          temp.push(q)
        })
        this.questions = temp
        this.questions.forEach((q: any) =>{
          console.log(q)
          if (q._id == event._id) {
            this.openPoll(q)
          }
        })
        this.reload();
      })    
      
    })
  }

  login(): void {
    this.username = this.tempUsername
  }

}
