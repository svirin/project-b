import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes =
  [
    { path: '', component: HomeComponent }
  ];

@NgModule({

  imports:
  [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports:
  [
    [RouterModule]
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
