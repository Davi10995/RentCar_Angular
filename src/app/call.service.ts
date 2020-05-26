import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {strict} from 'assert';

@Injectable()
export class CallService{
  constructor(
    private http: HttpClient
  ) {
  }
  // getData(data: string){
  //   switch (data) {
  //     case 'user':
  //       return this.http.get('http://localhost:3000/users');
  //     case 'veicoli':
  //       return this.http.get('http://localhost:3000/veicoli');
  //     case 'prenotazioni':
  //       return this.http.get('http://localhost:3000/prenotazioni');
  //   }
  // }
  getUsers(){
    return this.http.get('http://localhost:3000/users');
  }
  getVeicoli(){
    return this.http.get('http://localhost:3000/veicoli');
  }
  getPrenotazioni(){
    return this.http.get('http://localhost:3000/prenotazioni');
  }
  getUserById(id: string){
    return this.http.get('http://localhost:3000/users?id=' + id);
  }

  getVeicoloById(id: string){
    return this.http.get('http://localhost:3000/veicoli?id=' + id);
  }
}
