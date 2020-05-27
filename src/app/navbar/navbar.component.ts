import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))[0];
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }

}
