import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';


@NgModule({
  declarations:
  [
    HeaderComponent,
    HomeComponent
  ],
  imports:
  [
    AppRoutingModule,
    AuthModule,
    UserModule,
    SharedModule,
  ],
  exports:
  [
    AppRoutingModule,
    HeaderComponent
  ],
  providers:
  [
    AuthService,
    UserService,
    DataStorageService,
  ]
})
export class CoreModule { }
