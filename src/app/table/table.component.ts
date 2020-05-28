import {Component, OnInit, Input} from '@angular/core';

import * as _ from 'lodash';

import {CallService} from '../call.service';
import {Config} from '../../model/config/config.model';
import {User} from '../../model/user.model';
import {Veicolo} from '../../model/veicolo.model';
import {Prenotazione} from '../../model/prenotazione.model';
import {Router} from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data = [];
  // Dichiarazione dei campi header della tabella Users
  @Input() config: Config;
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
  currentUser: User;




  constructor(
    private callService: CallService,
    private route: Router
  ) {
  }
  ngOnInit(): void {
    this.init();
    this.pagination();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))[0];
  }

  search(filtro, ricerca){
    if (ricerca === ''){
      this.dataSearch = this.data;
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

  init(){
    switch (this.config.dato) {
      case 'user':
        this.callService.getUsers().subscribe((res: User[]) => {
          for (let i = 0; i < res.length; i++){
            this.data = _.filter(res, {tipo: 'Customer'});
          }
          this.dataSearch = this.data;
        });
        break;
      case 'veicoli':
        this.callService.getVeicoli().subscribe((res: Veicolo[]) => {
          for (let i = 0; i < res.length; i++){
            this.data.push(res[i]);
          }
          this.dataSearch = this.data;
        });
        break;
      case 'prenotazioni':
        this.callService.getPrenotazioni().subscribe((res: Prenotazione[]) => {
          for (let i = 0; i < res.length; i++){
            const userid = res[i].fk_user;
            const veicoloId = res[i].fk_veicolo;
            this.callService.getUserById(userid).subscribe((resUser: User) => {
              const user = resUser;
              const dato = res[i];
              dato.nomeUser = user[0].nome;
              dato.cognomeUser = user[0].cognome;
              this.callService.getVeicoloById(veicoloId).subscribe((resVeic: Veicolo) => {
                dato.modello = resVeic[0].modello;
                dato.targa = resVeic[0].targa;
                // SOlo le prenotazioni dell'utente in sessione
                if (res[i].fk_user === this.currentUser.id) {
                  this.data.push(dato);
                }
              });
            });

          }
          this.dataSearch = this.data;
        });
        break;
    }
  }

  // Dopo la cancellazione i dati visualizzati verranno aggiornati con quelli più recenti
  delete(id){
    if (confirm('Sei sicuro di volerlo eliminare?')) {
      switch (this.config.dato) {
        case 'user':
          // Cancellazione ed aggiornamento dati
          this.callService.deleteUser(id).toPromise().then(() => {
            this.callService.getUsers().subscribe((res: User[]) => {
              this.dataSearch = _.filter(res, {tipo: 'Customer'});
            });
          });
          break;
        case 'veicoli':
          this.callService.deleteVeicolo(id).toPromise().then(() => {
            this.callService.getVeicoli().subscribe((res: Veicolo[]) => {
              this.dataSearch = res;
            });
          });
          break;
        case 'prenotazioni':
          this.callService.deletePrenotazione(id).toPromise().then(() => {
            this.callService.getPrenotazioni().subscribe((res: Prenotazione[]) => {
              this.dataSearch = res;
            });
          });
          break;
      }
    }
  }


}
