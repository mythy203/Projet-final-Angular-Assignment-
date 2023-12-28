import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';

const routes: Routes =[{
  path: "add-assignment",component:AddAssignmentComponent
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
