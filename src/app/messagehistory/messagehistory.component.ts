import { Component, OnInit, Input } from '@angular/core';
import { MessagingHistoryService } from '../services/messaginghistory.service'


@Component({
  selector: 'app-messagehistory',
  templateUrl: './messagehistory.component.html',
  styleUrls: ['./messagehistory.component.css']
})
export class MessagehistoryComponent implements OnInit {
  @Input() messageHistory: messageHistory;
  constructor(private MessageHistoryService: MessagingHistoryService) { }

  ngOnInit() {
    }

}
