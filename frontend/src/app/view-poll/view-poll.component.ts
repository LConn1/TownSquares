import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {

  @Input() q_id: any;
  @Input() question: any;
  @Input() option1: any;
  @Input() option2: any;
  @Input() option3: any;
  @Input() username: any;
  @Input() myusername: any;
  @Input() voters: any;
  @Output() voteEmitter: EventEmitter<any> = new EventEmitter();

  voted = false;

  constructor() { }

  ngOnInit(): void {

  }

  vote(option: any): void {
    console.log(option.option)
    console.log(this.option1)
    if (option.option == this.option1.option) {
      this.option1.votes += 1
    }
    if (option.option == this.option2.option) {
      this.option2.votes += 1
    }
    if (option.option == this.option3.option) {
      this.option3.votes += 1
    }
    this.voted = true
    const answer = {
      _id: this.q_id,
      option: option.option
    }
    this.voteEmitter.emit(answer)
  }

}
