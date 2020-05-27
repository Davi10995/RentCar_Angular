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
  header: Header[];
  operation: Operations;
  config: Config;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'))[0];
    if (this.user.tipo === 'SuperUser'){
      this.superUser();
    }
    else{
      this.customer();
    }
  }

  ngOnInit(): void {
  }

  superUser(){
    const strings = [{key: 'cf', value: 'CF'},
      {key: 'nome', value: 'Nome'},
      {key: 'cognome', value: 'Cognome'},
      {key: 'data', value: 'Data'}];

    // For Config
    this.header = strings;

    this.operation = new Operations(new Sort(true, [
        'cf',
        'nome',
        'cognome'
      ]),
      new Pagination(5, [5, 10, 15]),
      new Search(true, [
        'nome',
        'cognome'
      ] ));
    this.config = new Config(this.header, this.operation, 'user');
  }

  customer(){
    const strings = [
      {key: 'nomeUser', value: 'Nome'},
      {key: 'cognomeUser', value: 'Cognome'},
      {key: 'modello', value: 'Modello'},
      {key: 'targa', value: 'Targa'},
      {key: 'dataInizio', value: 'DataInizio'},
      {key: 'dataFine', value: 'dataFine'}
      ];

    // For Config
    this.header = strings;

    this.operation = new Operations(new Sort(false, null),
      new Pagination(5, [5, 10, 15]),
      new Search(false, null ));

    this.config = new Config(this.header, this.operation, 'prenotazioni');
  }
}
