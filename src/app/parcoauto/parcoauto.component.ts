import { Component, OnInit } from '@angular/core';
import {CallService} from '../call.service';
import {Veicolo} from '../../model/veicolo.model';
import {Config} from '../../model/config/config.model';
import {Operations} from '../../model/config/operations/operations.model';
import {Sort} from '../../model/config/operations/sort.model';
import {Pagination} from '../../model/config/operations/pagination.model';
import {Search} from '../../model/config/operations/search.model';
import {Header} from '../../model/config/header/header.model';

@Component({
  selector: 'app-parcoauto',
  templateUrl: './parcoauto.component.html',
  styleUrls: ['./parcoauto.component.css']
})
export class ParcoautoComponent implements OnInit {

  config: Config;
  constructor(private callService: CallService) { }

  ngOnInit(): void {
    this.getConfig();
  }


  getConfig(){
      const strings = [
        {key: 'modello', value: 'Modello'},
        {key: 'casaCostrutt', value: 'Casa'},
        {key: 'targa', value: 'Targa'},
        {key: 'annoImm', value: 'Anno'}
      ];

      // For Config
      const header = strings;

      const operation = new Operations(new Sort(true, null),
        new Pagination(5, [5, 10, 15]),
        new Search(false, null ));

      this.config = new Config(header, operation, 'veicoli');
  }
}
