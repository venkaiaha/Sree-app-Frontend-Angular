import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
// import { AppModule } from 'src/app/app.module';
// import{SharedModule} from '../shared/shared/shared.module';


import { TokenInterceptor } from './../auth/token.interceptor';
import { JwtInterceptor } from './../auth/jwt.interceptor';
import { AuthService } from './../auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountantPopupComponent } from './accountant-popup/accountant-popup.component';
import { AccountantStatusComponent } from '../accountant/accountant-status/accountant-status.component';

// import { StatusComponent } from '../bookkeeper/status/status.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
// import { CompanyRegistrationComponent } from '../registration/company-registration/company-registration.component';

const routes: Routes = [
    { path: "", redirectTo: 'status', pathMatch: "full" },
    { path: 'view', component: AccountantPopupComponent },
    { path: 'status', component: AccountantStatusComponent },
    { path: 'search', component: CustomerRegistrationComponent }
]
@NgModule({
    declarations: [
        // StatusComponent,
        CustomerRegistrationComponent,
        // CompanyRegistrationComponent
        AccountantPopupComponent,
        AccountantStatusComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
        // SharedModule
        // AppModule


    ],
    providers: [JwtInterceptor, AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    exports: [RouterModule]
    // entryComponents: []

})
export class AccountantModule { }
