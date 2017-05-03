import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let coins = [
      {id: 11, name: 'Ethereal'},
      {id: 12, name: 'Bitecoin'},
      {id: 13, name: 'Golemy'},
      {id: 14, name: 'Nosys'},
      {id: 15, name: 'HeavyCoin'}
    ];
    return { coins };  // creates an in-memory table called 'coins' with a route called 'api/coins'
  }
}
