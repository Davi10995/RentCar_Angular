import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {Pagination} from '../../model/config/operations/pagination.model';
import {Search} from '../../model/config/operations/search.model';
import {Operations} from '../../model/config/operations/operations.model';
import {Sort} from '../../model/config/operations/sort.model';
import {Header} from '../../model/config/header/header.model';
import {Config} from '../../model/config/config.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  strings = [{key: 'cf', value: 'CF'},
    {key: 'nome', value: 'Nome'},
    {key: 'cognome', value: 'Cognome'},
    {key: 'data', value: 'Data'}];

  // For Config
  header: Header[] = this.strings;

  operation: Operations = new Operations(new Sort(true, [
      'cf',
      'nome',
      'cognome'
    ]),
    new Pagination(5, [5, 10, 15]),
    new Search(true, [
      'nome',
      'cognome'
    ] ));

  config: Config = new Config(this.header, this.operation);
  constructor() {
    console.log('local:', localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'))[0];
    console.log(this.user);
  }

  ngOnInit(): void {
  }

}
