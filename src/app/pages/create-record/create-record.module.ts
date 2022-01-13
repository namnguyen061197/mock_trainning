import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecordComponent } from './create-record.component';
import { ConfirmLeaveGuard } from 'src/app/core/guards/confirm-leave.guard';


const routes:Routes = [
  {
    path:'',
    children: [
      {
        path:'create',
        component:CreateRecordComponent
      },
      {
        path:'edit/:idRecord',
        component:CreateRecordComponent,
        canDeactivate:[ConfirmLeaveGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  providers: [
    DecimalPipe
  ]
})
export class RecordModule { }
