export class Pagination{
    public rows: number;
    public rowsForPage: [number];

    constructor(rows, rowsForPage) {
      this.rows = rows;
      this.rowsForPage = rowsForPage;
    }
}
