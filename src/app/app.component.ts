import { Component } from '@angular/core';
import {CallService} from './call.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentCarAngular';
  user: User;

  constructor(
    private callService: CallService
  ) {
    callService.getData('user').subscribe((res: User) => {
      console.log(res);
      this.user = res;
      console.log(res.nome);
    });
  }
}


