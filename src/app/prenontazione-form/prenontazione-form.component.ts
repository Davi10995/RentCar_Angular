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


  constructor(private route: ActivatedRoute,
              private callService: CallService){}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.callService.getVeicoloById(id).subscribe((res: Veicolo) => {
      this.veicolo = res[0];
    });

  }
  prenota(){
  }
}
