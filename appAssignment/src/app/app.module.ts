import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import {MatListModule} from '@angular/material/list';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './assignments/app-routing.module';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';

//  datepicker
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {AssignmentsService} from'./shared/assignments.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {RouterModule, Routes} from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component'
import { authGuard } from './shared/auth.guard';

//httpClient va permet de faire des appels Ajax vers des web services
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './assignments/login/login.component';

//pagination
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



const routes: Routes =[
  {path:'', component: AssignmentsComponent},
  {path:'home', component: AssignmentsComponent},
  {path:'add', component: AddAssignmentComponent},
  {path:'assignment/:id', component: AssignmentDetailComponent},
  // {path:'assignment/:id/edit', component: EditAssignmentComponent},
  {
    path:'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AddAssignmentComponent,
    AssignmentDetailComponent,
    EditAssignmentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [AssignmentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
