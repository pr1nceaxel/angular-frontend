import { Routes } from '@angular/router';
import { adminGuard } from './core/admin.guard';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login').then((m) => m.LoginComponent) },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'assignments' },
      {
        path: 'assignments',
        loadComponent: () =>
          import('./assignments/assignment-list/assignment-list').then(
            (m) => m.AssignmentListComponent
          ),
      },
      {
        path: 'assignments/add',
        loadComponent: () =>
          import('./assignments/assignment-form/assignment-form').then(
            (m) => m.AssignmentFormComponent
          ),
      },
      {
        path: 'assignments/:id/edit',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./assignments/assignment-form/assignment-form').then(
            (m) => m.AssignmentFormComponent
          ),
      },
      {
        path: 'assignments/:id',
        loadComponent: () =>
          import('./assignments/assignment-detail/assignment-detail').then(
            (m) => m.AssignmentDetailComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'assignments' },
];
