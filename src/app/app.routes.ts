import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent: () => import('./features/pallete/pallete.component').then(m => m.PalleteComponent)}
];
