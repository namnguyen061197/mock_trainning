import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailRecordComponent } from './pages/detail-record/detail-record.component';
import { HomeComponent } from './pages/home/home.component';

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
