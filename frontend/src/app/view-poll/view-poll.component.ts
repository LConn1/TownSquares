import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {

  }

  vote(option: any): void {
    const answer = {
      poll_id: 123,
      option: option
    }
    this.voteEmitter.emit(answer)
  }

}
