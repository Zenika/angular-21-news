import { Routes } from '@angular/router';
import { ReactiveForm } from './reactive-form/reactive-form';
import { SignalForm } from './signal-form/signal-form';

export const routes: Routes = [
  {
    path: 'signal-form',
    component: SignalForm,
  },
  {
    path: 'reactive-form',
    component: ReactiveForm,
  },
  {
    path: '**',
    redirectTo: '/signal-form',
  },
];
