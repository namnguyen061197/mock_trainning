import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecordComponent } from './pages/create-record/create-record.component';
import { DetailRecordComponent } from './pages/detail-record/detail-record.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfirmLeaveGuard } from './core/guards/confirm-leave.guard'

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'detail/:idRecord',
    component:DetailRecordComponent
  },
  {
    path:'new_record',
    component:CreateRecordComponent
  },
  {
    path:'edit_record/:idRecord',
    component:CreateRecordComponent,
    canDeactivate:[ConfirmLeaveGuard]
  },
  {
    path:'**',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: "enabled"
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
