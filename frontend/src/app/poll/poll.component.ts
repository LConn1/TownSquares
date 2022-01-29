import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AnySourceData } from 'mapbox-gl';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  poll: any = {
    question: "",
    options: [],
    coordinates: {},
    radius: 5
  }

  option1: any;
  option2: any;
  option3: any;

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  createPoll(): void {
    this.poll.options = [this.option1, this.option2, this.option3]
    const body = {
      question: this.poll.question,
      options: this.poll.options,
      coordinates: this.poll.coordinates,
      radius: 5
    }
    this.apiService.postQuestion(body).subscribe((data: any) => {
      this.poll.question = ""
      this.poll.options = []
      this.poll.coordinates = {}
      this.poll.radius = 5
      this._snackBar.open("Poll Submitted!");
    },
    (err: any) => {
      alert(err)
    })
  }

  clearPoll(): void {
    this.poll.question = ""
    this.poll.options = []
    this.poll.coordinates = {}
    this.poll.radius = 5
    this.option1 = ""
    this.option2 = ""
    this.option3 = ""
  }

}