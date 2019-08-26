import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../app/shared/shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ToolbarComponent } from './registration/toolbar/toolbar.component';
import { AdminComponent } from './admin/admin.component';
import { BookkeeperComponent } from './bookkeeper/bookkeeper.component';
import { AccountantComponent } from './accountant/accountant.component';
import { FileViewerComponent } from './registration/file-viewer/file-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'toolbar', component: ToolbarComponent },
  {
    path: 'operator', component: RegistrationComponent,
    children: [
      { path: '', loadChildren: '../app/shared/shared/shared.module#SharedModule' },
    ]
  },
  
  {
    path: 'administrator', component: AdminComponent,
    children: [
      { path: '', loadChildren: './admin/admin.module#AdminModule' },
    ]
  },
  {
    path: 'bookkeeper', component: BookkeeperComponent,
    children: [
      { path: '', loadChildren: './bookkeeper/bookkeeper.module#BookKeeperModule' },
    ]
  },
  {
    path: 'accountant', component: AccountantComponent,
    children: [
      { path: '', loadChildren: './accountant/accountant.module#AccountantModule' },
    ]
  },
  { path: 'fileviewer', component: FileViewerComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
})
export class AppRoutingModule { }
