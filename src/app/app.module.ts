import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../app/shared/shared/shared.module';
import { BookKeeperModule } from './bookkeeper/bookkeeper.module';
import { AccountantModule } from './accountant/accountant.module';
import { AdminModule } from './admin/admin.module';
import { ImageViewerModule } from 'ng2-image-viewer';
import { AppRoutingModule } from './app-routing.module';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { HttpModule } from '@angular/http';


import { from } from 'rxjs';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
// import { CustomerRegistrationComponent } from './registration/customer-registration/customer-registration.component';
// import { CompanyRegistrationComponent } from './registration/company-registration/company-registration.component';
import { ToolbarComponent } from './registration/toolbar/toolbar.component';
import { AdminComponent } from './admin/admin.component';
// import { BookKeeper1Component } from './registration/book-keeper1/book-keeper1.component';
import { Accountant1Component } from './registration/accountant1/accountant1.component';
// import { BookkeeperComponent } from './bookkeeper/bookkeeper.component';
// import { AccountantComponent } from './accountant/accountant.component';
import { PopupComponent } from '../app/popup/popup.component';
// import { StaffRegistrationComponent } from './admin/staff-registration/staff-registration.component';
import { StaffDetailsComponent } from './admin/staff-details/staff-details.component';
// import { StatusComponent } from './bookkeeper/status/status.component';
// import { AccountantStatusComponent } from './accountant/accountant-status/accountant-status.component';
// import { BookkeeperPopupComponent } from './bookkeeper/bookkeeper-popup/bookkeeper-popup.component';
import { TaskAllocationComponent } from './registration/book-keeper1/task-allocation/task-allocation.component';
import { FileViewerComponent } from './registration/file-viewer/file-viewer.component';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
// import { AccountantPopupComponent } from './accountant/accountant-popup/accountant-popup.component';





import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';
import { OperatorService } from './registration/operator.service';
import { KeeperService } from '../app/bookkeeper/keeper.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    // CustomerRegistrationComponent,
    // CompanyRegistrationComponent,
    AdminComponent,
    // BookKeeper1Component,
    Accountant1Component,
    // BookkeeperComponent,
    // AccountantComponent,
    ToolbarComponent,
    PopupComponent,
    // StaffRegistrationComponent,
    StaffDetailsComponent,
    // StatusComponent,
    // AccountantStatusComponent,
    // BookkeeperPopupComponent,
    TaskAllocationComponent,
    FileViewerComponent,
    AlertPopupComponent,
    // AccountantPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    PagesModule,
    // OperatorModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    ImageViewerModule,
    SharedModule,
    AdminModule
    // BookKeeperModule
  ],
  exports: [TaskAllocationComponent],
  providers: [UserService, KeeperService, OperatorService, JwtInterceptor, AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent, TaskAllocationComponent, FileViewerComponent, AlertPopupComponent,ProfileComponent]
})
export class AppModule { }
