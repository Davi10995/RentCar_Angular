import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CallService{
  constructor(
    private http: HttpClient
  ) {
  }
  getData(data: string){
    switch (data) {
      case 'user':
        return this.http.get('http://localhost:3000/users');
      case 'veicolo':
        return this.http.get('http://localhost:3000/veicolo');
      case 'prenotazione':
        return this.http.get('http://localhost:3000/prenotazione');
    }
  }
}
