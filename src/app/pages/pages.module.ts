import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MaterialModule } from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../user.service';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [UserService]
})
export class PagesModule { }
