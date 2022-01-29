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

  constructor() { }

  ngOnInit(): void {

  }

  vote(option: any): void {
    const answer = {
      _id: this.q_id,
      option: option.option
    }
    this.voteEmitter.emit(answer)
  }

}
