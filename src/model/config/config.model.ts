import {Header} from './header/header.model';
import {Operations} from './operations/operations.model';

export class Config{
  constructor(
    public header: Header[],
    public operations: Operations
  ) {
  }
}
