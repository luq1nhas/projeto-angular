import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';


interface Value {
  value: string;
  view_value: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent{
  id: number = 0;
  registerType: string = '';
  personType: string = '';
  clientName: string = '';
  clientCPF_CNPJ: string = '';
  status: string = '';
  clientType: string = '';
  clientFantasy: string = '';
  alterName: string = '';
  clientRG: string = '';
  clientPhone: string = '';
  clientCellphone: string = '';
  autoDiscount: number = 0;
  cep: string = '';
  uf: string = '';
  country: string = '';
  adress: string = '';
  neighborhood: string = '';
  number: string = '';
  iePR: string = '';
  description: string = '';

  registersType: Value[] = [
    { value: 'Cliente', view_value: 'Cliente' },
    { value: 'Fornecedor', view_value: 'Fornecedor' },
    { value: 'Cliente-fornecedor', view_value: 'Cliente / Fornecedor' },
    { value: 'Transportadora', view_value: 'Transportadora' },
    { value: 'Funcionario', view_value: 'Funcionário' },
  ];

  peopleType: Value[] = [
    { value: 'Fisica', view_value: 'Física' },
    { value: 'Juridica', view_value: 'Jurídica' },
  ];

  viewType: Value[] = [
    { value: 'true', view_value: 'Sim' },
    { value: 'false', view_value: 'Não' },
  ];

  alterNameType: Value[] = [
    { value: 'true', view_value: 'Sim' },
    { value: 'false', view_value: 'Não' },
  ];

  clientsType: Value[] = [
    { value: '1', view_value: 'Contribuinte' },
    { value: '2', view_value: 'Não Contribuinte' },
    { value: '3', view_value: 'Produtor Rural' },
  ];

  constructor(
    private clientService: ClientService,
  ) {}

  
  loadCEP() {
    this.clientService.getCEP(this.cep).then((response: any) => {
      this.neighborhood = response.bairro;
      this.cep = response.cep;
      this.description = response.complemento;
      this.country = response.localidade;
      this.adress = response.logradouro;
      this.uf = response.uf;
    });
  }
}
