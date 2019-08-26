import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { TokenInterceptor } from './../auth/token.interceptor';
import { JwtInterceptor } from './../auth/jwt.interceptor';
import { AuthService } from './../auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StatusComponent } from '../bookkeeper/status/status.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomeredRegistrationComponent } from './customered-registration/customer-registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { StaffRegistrationComponent } from './staff-registration/staff-registration.component';
// import { BookkeeperPopupComponent } from './bookkeeper-popup/bookkeeper-popup.component';
import { BookKeeper1Component } from './book-keeper1/book-keeper1.component';
import { AdminComponent} from './admin.component';
import { UpdateComponent } from './update/update.component';
import { TaskAllocationComponent } from './book-keeper1/task-allocation/task-allocation.component';
import { ClaimTrackComponent } from './claim-track/claim-track.component';
import { TimetrackComponent } from './timetrack/timetrack.component';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';




const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: CustomerRegistrationComponent },
  { path: 'status', component: BookKeeper1Component },
  { path: 'registration', component: StaffRegistrationComponent },
  { path: 'change', component: CustomeredRegistrationComponent },
  { path: 'claim/track', component: ClaimTrackComponent },
  { path: 'staff/time/track', component: TimetrackComponent },
  { path: 'profile', component: ProfileComponent }

];
@NgModule({
  declarations: [
    StaffRegistrationComponent,
    BookKeeper1Component,
    CustomerRegistrationComponent,
    CompanyRegistrationComponent,
    UpdateComponent,
    CustomeredRegistrationComponent,
    TaskAllocationComponent,
    ClaimTrackComponent,
    TimetrackComponent,
    ProfileComponent
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
  exports: [RouterModule],
  entryComponents: [UpdateComponent, TaskAllocationComponent,ProfileComponent]
})
export class AdminModule { }


