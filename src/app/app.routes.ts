import { Routes } from '@angular/router';
import { ExampleComponent } from './pages/example/example.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/pages.routes').then((m) => m.pagesRoutes),
  },
];
