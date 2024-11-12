import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main-view'
    },
    {
        path: 'auth',
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent)

    },
    {
        path: 'main-view',
        loadComponent: () => import('./layout/main/main.component').then(m => m.MainComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: 'hardware',
                loadComponent: () => import('./pages/hardware/hardware.component').then(m => m.HardwareComponent),
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: 'main-view',
    }
];
