import {Component, OnInit, Input} from '@angular/core';

import * as _ from 'lodash';

import {CallService} from '../call.service';
import {Config} from '../../model/config/config.model';
import {User} from '../../model/user.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data = [];
  // Dichiarazione dei campi header della tabella Users
  @Input() config: Config;
  // @Input() dato: string;
  dataSearch = [];
  rows = 5;
  nOfPages: number;
  pagesVisibility = false;
  pageArray = [];
  next = false;
  // se la pagine corrente è la 1 non mostro la pagina 0
  previousPageVisibility = false;
  nextPageVisibility = false;
  previous = false;
  currentPage = 0;
  constructor(
    private callService: CallService
  ) {
    callService.getData('user').subscribe((res: User[]) => {
      for(let i = 0; i < res.length; i++){
        this.data.push(res[i]);
      }
    });
  }
  ngOnInit(): void {
      this.dataSearch = this.data;
      this.pagination();
      if (this.data.length > this.rows){
        this.pagesVisibility = true;
        this.next = true;
        this.nextPageVisibility = true;
        this.nOfPages = this.dataSearch.length / this.rows;
        for ( let i = 0; i < this.nOfPages; i++){
          if (this.nOfPages / this.rows > this.pageArray.length) {
            this.pageArray.push(i + 1);
          }
        }
      }
      else{
        this.pagesVisibility = false;
      }
  }

  search(filtro, ricerca){
    if (ricerca === ''){
      this.dataSearch = this.data;
      console.log('in table: ', this.config);
      return;
    }
    if (filtro === 'nome') {
      this.dataSearch = _.filter(this.data, {nome: ricerca});
    }
    else {
      this.dataSearch = _.filter(this.data, {cognome: ricerca});
    }
  }

  sort(filter){
    this.dataSearch = _.sortBy(this.data, [filter]);
  }

  pagination(){
    this.dataSearch = _.slice(this.dataSearch, 0, this.rows);
    this.nOfPages = this.dataSearch.length / this.rows;
    this.changePage(0);
  }

  changePage(current){
    this.dataSearch = _.slice(this.data, (this.rows * current), (this.rows * (current + 1)));
    this.currentPage = current;
    if (this.currentPage > 0){
      this.previous = true;
      this.previousPageVisibility = true;
    }
    else{
      this.previousPageVisibility = false;
      this.previous = false;
    }
    if (this.currentPage >= (this.data.length / this.rows) - 1){
      this.next = false;
      this.nextPageVisibility = false;
    }
    else{
      this.next = true;
      this.nextPageVisibility = true;
    }
  }

}
