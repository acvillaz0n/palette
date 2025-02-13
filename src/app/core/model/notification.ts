import { NotificationColor } from "./notification-color";
import { NotificationType } from "./notification-type";

export interface Notification{
    id:number;
    message: string;
    type: NotificationType;
    color?: NotificationColor
}