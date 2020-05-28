import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {strict} from 'assert';
import {User} from '../model/user.model';
import {Veicolo} from '../model/veicolo.model';
import {Prenotazione} from '../model/prenotazione.model';

@Injectable()
export class CallService{
  constructor(
    private http: HttpClient
  ) {
  }

  // USERS ----------------------------------------------------------------------
  getUsers(){
    return this.http.get('http://localhost:3000/users');
  }

  getUserById(id: string){
    return this.http.get('http://localhost:3000/users?id=' + id);
  }

  addUser(user: User){
    return this.http.post('http://localhost:3000/users/', user).toPromise();
  }

  updateUser(id: string, user: User){
    return this.http.put('http://localhost:3000/users/' + id, user).toPromise();
  }

  deleteUser(id: string){
     return this.http.delete('http://localhost:3000/users/' + id);
  }

  // VEICOLI ----------------------------------------------------------------------

  getVeicoli(){
    return this.http.get('http://localhost:3000/veicoli');
  }

  getVeicoloById(id: string){
    return this.http.get('http://localhost:3000/veicoli?id=' + id);
  }

  addVeicolo(veicolo: Veicolo){
    return this.http.post('http://localhost:3000/veicoli/', veicolo).toPromise();
  }

  updateVeicolo(id: string, veicolo: Veicolo){
    return this.http.put('http://localhost:3000/veicoli/' + id, veicolo).toPromise();
  }

  deleteVeicolo(id: string){
    return this.http.delete('http://localhost:3000/veicoli/' + id);
  }

  // PRENOTAZIONI ----------------------------------------------------------------------

  getPrenotazioni(){
    return this.http.get('http://localhost:3000/prenotazioni');
  }

  getPrenotazioniById(id: string){
    return this.http.get('http://localhost:3000/prenotazioni?id=' + id);
  }

  updatePrenotazione(id: string, prenotazione: Prenotazione){
    return this.http.put('http://localhost:3000/prenotazioni/' + id, prenotazione).toPromise();
  }
  deletePrenotazione(id: string){
    return this.http.delete('http://localhost:3000/prenotazioni/' + id);
  }


  // if(confirm('are you sure?'));
}
