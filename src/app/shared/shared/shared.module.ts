import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

import { TokenInterceptor } from '../../auth/token.interceptor';
import { JwtInterceptor } from '../../auth/jwt.interceptor';
import { AuthService } from '../../auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BookKeeper1Component } from '../../registration/book-keeper1/book-keeper1.component';
import { CustomerRegistrationComponent } from '../../registration/customer-registration/customer-registration.component';
import { CompanyRegistrationComponent } from '../../registration/company-registration/company-registration.component';
// import { StatusComponent } from '../../bookkeeper/status/status.component';
import { BookkeeperComponent } from '../../bookkeeper/bookkeeper.component';
import { AccountantComponent } from '../../accountant/accountant.component';
// import { AccountantStatusComponent } from '../../accountant/accountant-status/accountant-status.component';

// import { AppModule } from 'src/app/app.module';

const routes: Routes = [
  { path: "", redirectTo: 'search', pathMatch: "full" },
  { path: 'search', component: CustomerRegistrationComponent },
  { path: 'status', component: BookKeeper1Component },
  { path: 'registration', component: CompanyRegistrationComponent }
]
@NgModule({
  declarations: [
    CompanyRegistrationComponent,
    BookKeeper1Component,
    CustomerRegistrationComponent,
    // StatusComponent,
    BookkeeperComponent,
    AccountantComponent,
    
    // AccountantStatusComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
    // AppModule

  ],
  providers: [JwtInterceptor, AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  exports: [RouterModule]
})
export class SharedModule { }
