import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./presentation/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./presentation/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./presentation/onboarding/onboarding.page').then(m => m.OnboardingPage),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./presentation/tabs/tabs.page').then(m => m.TabsPage),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./presentation/dashboard/dashboard.page').then(m => m.DashboardPage),
      },
      {
        path: 'exams',
        loadComponent: () => import('./presentation/exams/exams.page').then(m => m.ExamsConfigPage),
      },
      {
        path: 'history',
        loadComponent: () => import('./presentation/history/history.page').then(m => m.HistoryPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./presentation/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'exam-session',
    loadComponent: () => import('./presentation/exam-session/exam-session.page').then(m => m.ExamSessionPage),
    canActivate: [authGuard],
  },
  {
    path: 'exam-review/:id',
    loadComponent: () => import('./presentation/exam-review/exam-review.page').then(m => m.ExamReviewPage),
    canActivate: [authGuard],
  },
  {
    path: 'payment',
    loadComponent: () => import('./presentation/payment/payment.page').then(m => m.PaymentPage),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];
