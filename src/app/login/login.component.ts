import { Component, OnInit } from '@angular/core';
import {CallService} from '../call.service';
import * as _ from 'lodash';
import {User} from '../../model/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = false;
  profile = new FormGroup({
    username: new FormControl('',
      Validators.required),
    password: new FormControl('',
      Validators.required)
  });

  users: User[] = [];
  userLogin: User[] = [];

  constructor(callService: CallService,
              private route: ActivatedRoute,
              private router: Router) {
    callService.getUsers().subscribe((res: User[]) => {
      for (let i = 0; i < res.length; i++){
        this.users.push(res[i]);
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn') === 'true'){
      this.router.navigateByUrl('/home');
    }
  }


  loginValidate(){
    this.userLogin = _.filter(this.users, {cf: this.profile.get('username').value, password: this.profile.get('password').value});
    if (this.userLogin.length > 0){
      // from user to json
      localStorage.setItem('currentUser', JSON.stringify(this.userLogin));
      localStorage.setItem('loggedIn', 'true');
      this.router.navigateByUrl('/home');
    }
    else {
      this.errorMessage = true;
    }
  }

}
