import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent: () => import('./features/pallete/pallete.component').then(m => m.PalleteComponent)},
    {path:'notif', loadComponent: () => import('./core/components/notification/notification.component').then(m => m.NotificationComponent)},
    {path:'img-color', loadComponent: () => import('./features/img-pick-color/img-pick-color.component').then(m => m.ImgPickColorComponent)}
];
