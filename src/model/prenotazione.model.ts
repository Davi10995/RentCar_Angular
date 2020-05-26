import {User} from './user.model';
import {Veicolo} from './veicolo.model';

export interface Prenotazione {
  id: string;
  dataInizio: string;
  dataFine: string;
  fk_user: string;
  fk_veicolo: string;
  approvata: boolean;
  nomeUser: string;
  cognomeUser: string;
  modello: string;
  targa: string;
}
