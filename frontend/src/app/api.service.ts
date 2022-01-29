import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getQuestions(): any {
    const headers = new HttpHeaders({"authorization": "Bearer " + sessionStorage.getItem("token")});
    return this.http.get('/questions', {headers: headers});
  }

  postQuestion(question: any): any {
    const headers = new HttpHeaders({"authorization": "Bearer " + sessionStorage.getItem("token")});
    const body = {
      question: question
    }
    return this.http.post('/question', body, {headers: headers});
  }

  postAnswer(answer: any): any {
    const headers = new HttpHeaders({"authorization": "Bearer " + sessionStorage.getItem("token")});
    const body = {
      answer: answer
    }
    return this.http.post('/answer', body, {headers: headers});
  }

}
