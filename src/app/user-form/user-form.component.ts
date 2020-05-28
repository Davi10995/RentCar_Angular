import { Component, OnInit } from '@angular/core';
import {CallService} from '../call.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user.model';
import {DatePipe} from '@angular/common';
import {DataconvertService} from '../utility/dataconvert.service';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  form = new FormGroup({
    cf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    cognome: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required)
  });
  user: User  = new User();
  currentUser: User;

  constructor(private callService: CallService,
              private dataPipe: DatePipe,
              private dataConvert: DataconvertService,
              private route: ActivatedRoute,
              private routing: Router) {}

  ngOnInit(): void {
    this.init();
  }


  addUpdateUser(){

    this.user.cf = this.form.get('cf').value;
    this.user.nome = this.form.get('nome').value;
    this.user.cognome = this.form.get('cognome').value;
    this.user.password = this.form.get('password').value;
    this.user.data = this.form.get('data').value;
    const data = new Date(this.user.data);
    this.user.data = this.dataPipe.transform(data, this.dataConvert.local);
    if (+this.route.snapshot.paramMap.get('id') > 0){
      this.callService.updateUser(this.route.snapshot.paramMap.get('id'), this.user);
      alert('Update effettuato!');
    }
    else {
      this.user.tipo = 'Customer';
      this.callService.addUser(this.user);
      alert('Utente inserito correttamente');
    }
    this.routing.navigateByUrl('/home');
  }

  init(){
    const id = this.route.snapshot.paramMap.get('id');
    if (+id > 0) {
      this.callService.getUserById(id).subscribe((res: User) => {
        this.user = res[0];
        this.form.get('cf').setValue(this.user.cf);
        this.form.get('nome').setValue(this.user.nome);
        this.form.get('cognome').setValue(this.user.cognome);
        this.form.get('password').setValue(this.user.password);
      });
    }
  }



}

