import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NotificationServiceService } from '@core/services/notification-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent  {
  public clock!: ReturnType<typeof setInterval>;
  public notificationService = inject(NotificationServiceService);
  public notifications = this.notificationService.notifications;

  public notificationClock = computed(() => {
    if(this.notifications().length){

      if(!this.clock){
        this.clock = setInterval(() => {
          this.checkClock(this.notifications())
        },1000)
      }

    }
  })

  checkClock(notifications: any[]){
    notifications.forEach((notification) => {
      if(document.getElementById(`${notification.id}`)?.offsetLeft as number >300){
        this.notifications.set(
          this.notifications().filter((notf) => notf.id != notification.id)
        )
      }
    });

    if(this.notifications().length===0){
      window.clearInterval(this.clock);
      this.clock = undefined as any;
    }
  }

  buildClassContainer(color: string | undefined){
    return `border-[${color}] notification-initial relative flex gap-2 items-center rounded-lg border-2 p-2`
  }

  buildClassText(color: string | undefined){
    return `text-[${color}]`
  }

  buildSrcImg(type: string | undefined){
    return `icons/${type}.svg`
  }
}
