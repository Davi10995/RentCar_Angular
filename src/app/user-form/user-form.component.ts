import { Component, OnInit } from '@angular/core';
import {CallService} from '../call.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private callService: CallService) { }

  ngOnInit(): void {
  }


  addUser(){
  }

}
