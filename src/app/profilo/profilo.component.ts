import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user.model';
import {CallService} from '../call.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Prenotazione} from '../../model/prenotazione.model';
import * as _ from 'lodash';
import {Operations} from '../../model/config/operations/operations.model';
import {Sort} from '../../model/config/operations/sort.model';
import {Pagination} from '../../model/config/operations/pagination.model';
import {Search} from '../../model/config/operations/search.model';
import {Config} from '../../model/config/config.model';
import {Header} from '../../model/config/header/header.model';
import {Veicolo} from '../../model/veicolo.model';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  currentUser: User;
  prenotazioni: Prenotazione[] = [];
  header: Header[];
  operation: Operations;
  config: Config;

  tablePrenotazioni = false;
  daApprovare = false;

  constructor(private callService: CallService,
              private route: ActivatedRoute,
              private routing: Router) { }

  ngOnInit(): void {
    this.init();

  }


  init(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))[0];
  }

  prenotazioniUser(){
    this.customerConfig();
    this.tablePrenotazioni = true;
  }


  customerConfig(){
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

  tuttePrenotazioni() {
    this.callService.getPrenotazioni().subscribe((res: Prenotazione[]) => {
      for (let i = 0; i < res.length; i++){
        if (res[i].approvata === 'false') {
          console.log(res[i]);
          const userid = res[i].fk_user;
          const veicoloId = res[i].fk_veicolo;
          console.log(userid);
          console.log(veicoloId);
          this.callService.getUserById(userid.toString()).subscribe((resUser: User) => {
            const user = resUser;
            const dato = res[i];
            console.log(dato);
            dato.nomeUser = user[0].nome;
            dato.cognomeUser = user[0].cognome;
            this.callService.getVeicoloById(veicoloId.toString()).subscribe((resVeic: Veicolo) => {
              dato.modello = resVeic[0].modello;
              dato.targa = resVeic[0].targa;
              this.prenotazioni.push(dato);
              console.log(this.prenotazioni);
            });
          });
        }
      }
    });
    this.daApprovare = true;
  }


  approva(id){
    this.callService.getPrenotazioniById(id).subscribe((res: Prenotazione) => {
      const prenotazione = res[0];
      prenotazione.approvata = 'true';
      console.log(prenotazione);
      this.callService.updatePrenotazione(id, prenotazione);
    });
    alert('Prenotazione approvata con successo');
    this.routing.navigateByUrl('/home');
  }

}


