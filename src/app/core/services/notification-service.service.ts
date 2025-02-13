import { Injectable, signal, WritableSignal } from '@angular/core';
import { Notification } from '@core/model/notification';
import { NotificationColor } from '@core/model/notification-color';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  public notifications: WritableSignal<Notification[]> = signal([]);
  
  createNotification(notification: Notification){
    const type = notification.type.toUpperCase() as 'DANGER' | 'WARNING' | 'SUCCESS' | 'INFO';
    notification.color = NotificationColor[type]
    this.notifications.update((curr) => [...curr,notification])
  }
}
