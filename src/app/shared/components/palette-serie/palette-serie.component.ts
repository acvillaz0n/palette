import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { NotificationType } from '@core/model/notification-type';
import { NotificationServiceService } from '@core/services/notification-service.service';

@Component({
  selector: 'app-palette-serie',
  imports: [UpperCasePipe],
  templateUrl: './palette-serie.component.html',
  styleUrl: './palette-serie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaletteSerieComponent {
  public titlePalette:InputSignal<string> = input.required();
  public paletteSerie:InputSignal<string[]> = input.required();
  private notificationService = inject(NotificationServiceService);

  copyColorInClipboard(color: string){
    navigator.clipboard.writeText(color);
    this.notificationService.createNotification({
      id:this.getRandomNumber(),
      message: "color succesfully copied",
      type: NotificationType.INFO
    })
  }

  getRandomNumber(){
    return new Date().getTime();
  }
}
