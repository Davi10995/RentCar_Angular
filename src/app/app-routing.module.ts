import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ParcoautoComponent} from './parcoauto/parcoauto.component';
import {PrenontazioneFormComponent} from './prenontazione-form/prenontazione-form.component';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'auto', component: ParcoautoComponent},
    {path: 'prenotazione/:id/details', component: PrenontazioneFormComponent, pathMatch: 'full'}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
export const routingComponent = [LoginComponent];
