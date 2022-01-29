import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiToken: any;

  constructor(private http: HttpClient) { }

  auth(): any {
    this.http.get('/auth').subscribe((data: any) => {
      sessionStorage.setItem("user_token", data.user_token);
    })
  }

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
