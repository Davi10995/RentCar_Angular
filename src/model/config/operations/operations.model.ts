import {Sort} from './sort.model';
import {Pagination} from './pagination.model';
import {Search} from './search.model';

export class Operations{
  constructor(
    public sort: Sort,
    public pagination: Pagination,
    public search: Search
  ) {
  }
}
