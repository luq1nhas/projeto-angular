import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private loginURL = 'https://desenvolvimento.maxdata.com.br/api/v1/Auth/login';
  private cadastroURL =
    'https://desenvolvimento.maxdata.com.br/api/v1/Cadastro';
  private cepURL = 'https://opencep.com/v1';

  constructor() {}

  login() {
    const loginData = {
      email: 'usuarioteste@maxdata.com.br',
      senha: 'j>grr@je',
    };

    return fetch(this.loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
        }
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  createClient(client: any): Promise<any> {
    return fetch(this.cadastroURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(client),
    }).then((response) => response.json());
  }

  updateClient(updatedClient: { [key: string]: any }, id: string) {
    const url = `${this.cadastroURL}/${updatedClient['id']}`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(updatedClient),
    }).then((response) => response.json());
  }

  listClients() {
    const url = `${this.cadastroURL}?limit=400`;
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    }).then((response) => response.json());
  }

  getClientDetails(clientId: number) {
    const url = `${this.cadastroURL}/${clientId}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    }).then((response) => response.json());
  }

  getCEP(cep: any) {
    const url = `${this.cepURL}/${cep}`;
    return fetch(url, {
      method: 'GET',
    }).then((response) => response.json());
  }

  desactivateClient(client: any, id: number): Promise<any> {
    const url = `${this.cadastroURL}/${id}`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(client),
    }).then((response) => response.json());
  }
}
