class HashQuery {
  constructor(data) {
    this.data = data;
  }

  where(f) {
    return new HashQuery(this.data.filter(x => f(x)));
  }

  count() {
    return this.data.length;
  }

  result() {
    return this.data;
  }
}
