import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Veicolo} from '../../model/veicolo.model';
import {ActivatedRoute} from '@angular/router';
import {CallService} from '../call.service';
import {Operations} from '../../model/config/operations/operations.model';
import {Sort} from '../../model/config/operations/sort.model';
import {Pagination} from '../../model/config/operations/pagination.model';
import {Search} from '../../model/config/operations/search.model';
import {Config} from '../../model/config/config.model';

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


  constructor(private route: ActivatedRoute,
              private callService: CallService){}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.callService.getVeicoloById(id).subscribe((res: Veicolo) => {
      this.veicolo = res[0];
    });

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
  }
}
