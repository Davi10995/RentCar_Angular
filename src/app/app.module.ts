import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {CallService} from './call.service';
import {DataconvertService} from './utility/dataconvert.service';
import {AppRoutingModule, routingComponent} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParcoautoComponent } from './parcoauto/parcoauto.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VeicoloFormComponent } from './veicolo-form/veicolo-form.component';
import { PrenontazioneFormComponent } from './prenontazione-form/prenontazione-form.component';
import {LoginComponent} from './login/login.component';
import {DatePipe} from '@angular/common';
import { ProfiloComponent } from './profilo/profilo.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    HomeComponent,
    LoginComponent,
    TableComponent,
    NavbarComponent,
    ParcoautoComponent,
    UserFormComponent,
    VeicoloFormComponent,
    PrenontazioneFormComponent,
    ProfiloComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CallService, DatePipe, DataconvertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
