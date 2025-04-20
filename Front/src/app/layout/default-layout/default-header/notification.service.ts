import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications = new BehaviorSubject<any[]>([]);
  currentNotifications = this.notifications.asObservable();

  addNotification(notification: any) {
    const current = this.notifications.value;
    if (!current.find(n => n.id === notification.id)) {
      this.notifications.next([...current, notification]);
    }
  }

  removeNotification(id: number) {
    const filtered = this.notifications.value.filter(n => n.id !== id);
    this.notifications.next(filtered);
  }
}