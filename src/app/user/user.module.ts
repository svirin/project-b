import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { GalleryComponent } from './user-details/gallery/gallery.component';

@NgModule({
  declarations: [
    UserEditComponent,
    UserDetailsComponent,
    GalleryComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
