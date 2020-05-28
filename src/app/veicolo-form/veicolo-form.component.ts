import { Component, OnInit } from '@angular/core';
import {CallService} from '../call.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Veicolo} from '../../model/veicolo.model';
import {User} from '../../model/user.model';
import {ActivatedRoute, Router} from '@angular/router';

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

  veicolo = new Veicolo();

  constructor(private callService: CallService,
              private route: ActivatedRoute,
              private routing: Router) { }

  ngOnInit(): void {
    this.init();
  }

  addUpdateVeicolo(){

    this.veicolo.targa = this.form.get('targa').value;
    this.veicolo.modello = this.form.get('modello').value;
    this.veicolo.casaCostrutt = this.form.get('casaCostrutt').value;
    this.veicolo.annoImm = this.form.get('annoImm').value;
    this.veicolo.prenotabile = 'true';
    if (+this.route.snapshot.paramMap.get('id') > 0){
      this.callService.updateVeicolo(this.route.snapshot.paramMap.get('id'), this.veicolo);
    }
    else {
      this.callService.addVeicolo(this.veicolo);
    }
    this.routing.navigateByUrl('/auto');
  }


  init(){
    const id = this.route.snapshot.paramMap.get('id');
    if (+id > 0) {
      this.callService.getVeicoloById(id).subscribe((res: User) => {
        this.veicolo = res[0];
        this.form.get('targa').setValue(this.veicolo.targa);
        this.form.get('modello').setValue(this.veicolo.modello);
        this.form.get('casaCostrutt').setValue(this.veicolo.casaCostrutt);
        this.form.get('annoImm').setValue(this.veicolo.annoImm);
      });
    }
  }
}
