export class Sort{
    public active: boolean;
    public filter: [string];
    constructor(active, filter) {
      this.active = active;
      this.filter = filter;
    }
}
