import {Header} from './header/header.model';
import {Operations} from './operations/operations.model';

export class Config{
  public dato: string;
  constructor(
    public header: Header[],
    public operations: Operations,
    dato: string
  ) {
    this.dato = dato;
  }
}
