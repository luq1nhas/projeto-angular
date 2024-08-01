import { Component, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Value {
  value: string;
  viewValue: string;
}

interface Client {
  id: number;
  nome: string;
  ativo: boolean;
  fantasia: string;
  cpf_cnpj: string;
  rg_ie: string;
  tipo_pessoa: string;
  tipo_cadastro: string;
  cadastro_tipo_id: number;
  fone: string;
  chk_alterar_nome: boolean;
  desconto_auto_aplicar: boolean;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  client: Client[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'code',
    'name',
    'fantasy',
    'cpf/cnpj',
    'status',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientService: ClientService) {
    this.loadListClients()
  }

 loadListClients() {
    this.clientService.listClients().then(response => {
      this.client = response.itens;
      this.dataSource = new MatTableDataSource(this.client);
      this.dataSource.paginator = this.paginator;
      console.log(response)
    });
  }

  personType: Value[] = [
    { value: 'fisica', viewValue: 'Física' },
    { value: 'jurifica', viewValue: 'Jurídica' },
  ];

  viewType: Value[] = [
    { value: 'todos', viewValue: 'Todos' },
    { value: 'ativos', viewValue: 'Ativos' },
    { value: 'invativos', viewValue: 'Inativos' },
  ];
}
