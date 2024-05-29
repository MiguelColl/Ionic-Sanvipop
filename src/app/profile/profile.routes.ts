import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./profile-page/profile-page.page').then((m) => m.ProfilePagePage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./profile-page/profile-page.page').then((m) => m.ProfilePagePage),
  },
];
