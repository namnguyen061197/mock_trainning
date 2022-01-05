import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    loadChildren: () => import("./pages/detail-record/detail-record.module")
    .then(m => m.DetailRecordModule)
  },
  {
    path:'record',
    loadChildren: () => import("./pages/create-record/create-record.module")
    .then(m => m.RecordModule)
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
