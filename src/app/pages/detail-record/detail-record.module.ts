import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailRecordComponent } from './detail-record.component';


const routes:Routes = [
  {
    path:'',
    component: DetailRecordComponent
  }
]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class DetailRecordModule { }
