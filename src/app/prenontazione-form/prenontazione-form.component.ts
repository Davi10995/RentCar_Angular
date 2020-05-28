import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Veicolo} from '../../model/veicolo.model';
import {ActivatedRoute} from '@angular/router';
import {CallService} from '../call.service';
import {Prenotazione} from '../../model/prenotazione.model';
import {User} from '../../model/user.model';
import {DatePipe} from '@angular/common';
import {DataconvertService} from '../utility/dataconvert.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-prenontazione-form',
  templateUrl: './prenontazione-form.component.html',
  styleUrls: ['./prenontazione-form.component.css']
})
export class PrenontazioneFormComponent implements OnInit {

  form = new FormGroup({
    dataInizio: new FormControl('', Validators.required),
    dataFine: new FormControl('', Validators.required) }
  );
  veicolo: Veicolo;
  error = false;
  errorMessage: string;
  currentUser: User;
  prenotazione: Prenotazione = new Prenotazione();


  constructor(private route: ActivatedRoute,
              private callService: CallService,
              private dataPipe: DatePipe,
              private dataConvert: DataconvertService){}


  ngOnInit(): void {
    this.init();
  }
  prenota(){
    // const data = this.form.get('dataInizio').value;
    // console.log(data);
    // tslint:disable-next-line:max-line-length
    if (Date.parse(JSON.stringify(this.form.get('dataInizio').value)) < Date.now() || Date.parse(JSON.stringify(this.form.get('dataFine').value))
      < Date.now()){
      if (Date.parse(JSON.stringify(this.form.get('dataInizio').value)) > Date.parse(JSON.stringify(this.form.get('dataFine').value))){
        this.error = true;
        this.errorMessage = 'La data di fine non può essere precedente a quella di inizio prenotazione';
      }
      else {
        this.error = true;
        this.errorMessage = 'Il veicolo non può essere prenotato oggi o in data precedente ad oggi';
      }
    }
    else {
      const data = new Date(this.form.get('dataInizio').value);
      const data2 = new Date(this.form.get('dataFine').value);
      this.prenotazione.dataInizio = this.dataPipe.transform(data, this.dataConvert.local);
      this.prenotazione.dataFine = this.dataPipe.transform(data2, this.dataConvert.local);
      if (this.prenotazione == null) {
        this.prenotazione.fk_user = this.currentUser.id;
        this.prenotazione.nomeUser = this.currentUser.nome;
        this.prenotazione.cognomeUser = this.currentUser.cognome;
        this.prenotazione.targa = this.veicolo.targa;
        this.prenotazione.modello = this.veicolo.modello;
        this.prenotazione.approvata = 'false';
      }

    }
  }

  init(){
    const id = this.route.snapshot.paramMap.get('id');
    this.callService.getPrenotazioni().subscribe((res: Prenotazione) => {
      this.prenotazione = _.filter(res, {fk_veicolo: id});
    });
    if (this.prenotazione == null){
      this.callService.getVeicoloById(id).subscribe((res: Veicolo) => {
        this.veicolo = res[0];
      });
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')[0]);
    }
  }
}
