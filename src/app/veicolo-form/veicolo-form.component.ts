import { Component, OnInit } from '@angular/core';
import {CallService} from '../call.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-veicolo-form',
  templateUrl: './veicolo-form.component.html',
  styleUrls: ['./veicolo-form.component.css']
})
export class VeicoloFormComponent implements OnInit {

  form = new FormGroup({
    targa: new FormControl('', Validators.required),
    modello: new FormControl('', Validators.required),
    casaCostrutt: new FormControl('', Validators.required),
    annoImm: new FormControl('', Validators.required)
  });

  constructor(callService: CallService) { }

  ngOnInit(): void {
  }

  addUpdateVeicolo(){

  }
}
