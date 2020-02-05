import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './core/guards/auth-guard';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard], // [AuthGuard],
    children: [
      {
        path: 'tweets',
        loadChildren: () => import('./modules/tweets/tweets.module').then(m => m.TweetsModule)
      },
      {
        path: '',
        redirectTo: 'tweets',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
