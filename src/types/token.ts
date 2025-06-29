export class Token {
  name: string;
  symbol: string;
  address: string;
  constructor(_name: string, _symbol: string, _address: string) {
    this.name = _name;
    this.symbol = _symbol;
    this.address = _address;
  }
}
