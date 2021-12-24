import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { CreateRecordComponent } from './pages/create-record/create-record.component';
import { DetailRecordComponent } from './pages/detail-record/detail-record.component';
import { HeaderComponent } from './share/layouts/header/header.component';
import { TableComponent } from './share/components/table/table.component';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './share/components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateRecordComponent,
    DetailRecordComponent,
    HeaderComponent,
    TableComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
