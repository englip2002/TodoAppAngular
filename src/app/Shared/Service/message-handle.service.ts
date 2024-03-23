import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageHandleService {
  message: string;
  alertExist = new Subject<boolean>();
  isSuccessMessage: boolean;
  constructor() {}
}
