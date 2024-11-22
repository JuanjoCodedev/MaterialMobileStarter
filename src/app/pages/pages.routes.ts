import { Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { ExampleTwoComponent } from './example-two/example-two.component';

export const pagesRoutes: Routes = [
  {
    path: 'example',
    component: ExampleComponent,
  },
  {
    path: 'example-two',
    component: ExampleTwoComponent,
  },
  {
    path: '',
    redirectTo: 'example',
    pathMatch: 'full',
  },
];
