import { Routes } from '@angular/router';
import { Loginwindow } from './pages/loginwindow/loginwindow';
import { Authguardservice } from './dataservices/authguardservice';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'loginwindow',
      pathMatch: 'full'
   },
   {
      path: 'dashboard',
      loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
      canActivate: [Authguardservice]
   },
   {
      path: 'selectCompetencegrid',
      loadComponent: () => import('./pages/selectcompetencegrid/selectcompetencegrid').then(m => m.Selectcompetencegrid),
      canActivate: [Authguardservice]
   },
   {
      path: 'competencegrid/:competencegridId', 
      loadComponent: () => import('./pages/competencegrid/competencegrid').then(m => m.Competencegrid),
      canActivate: [Authguardservice]
   },
   {
      path: 'loginwindow',
      component: Loginwindow
   }

];
