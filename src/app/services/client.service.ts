import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private loginURL = 'https://desenvolvimento.maxdata.com.br/api/v1/Auth/login';
  private cadastroURL = 'https://desenvolvimento.maxdata.com.br/api/v1/Cadastro';

  constructor() { }
}
