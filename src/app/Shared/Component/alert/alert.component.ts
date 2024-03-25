import { Component, OnInit } from '@angular/core';
import { MessageHandleService } from '../../Service/message-handle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  message: string;
  isSuccessMessage: boolean;

  constructor(private messageHandlerService: MessageHandleService) {}

  ngOnInit(): void {
    this.message = this.messageHandlerService.message;
    this.isSuccessMessage = this.messageHandlerService.isSuccessMessage;
  }

  onCloseAlert() {
    this.message = null;
    this.isSuccessMessage = null;
    this.messageHandlerService.alertExist.next(false);
    this.messageHandlerService.isSuccessMessage = null;
    this.messageHandlerService.message = null;
  }
}
