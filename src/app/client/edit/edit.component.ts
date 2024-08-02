import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute } from '@angular/router';

interface Value {
  value: string;
  view_value: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  clientData: any;
  adressData: any;

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
  adressIBGE: string = 'F';

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
    private routeId: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.routeId.snapshot.paramMap.get('id') || '0', 10);
    this.clientService.getClientDetails(this.id).then((response: any) => {
      this.clientData = response;
      this.adressData = response.cadastro_endereco_padrao;

      const indexValueRegister = this.registersType.findIndex(
        (value) => value.value === response.tipo_cadastro
      );
      const indexValuePerson = this.peopleType.findIndex(
        (value) => value.value === response.tipo_pessoa
      );
      const indexValueActive = this.viewType.findIndex(
        (value) => value.value === String(response.ativo)
      );
      const indexValueAlter = this.alterNameType.findIndex(
        (value) => value.value === String(response.chk_alterar_nome)
      );

      this.registerType = this.registersType[indexValueRegister].value;
      this.personType = this.peopleType[indexValuePerson].value;
      this.clientName = response.nome;
      this.clientCPF_CNPJ = response.cpf_cnpj;
      this.status = this.viewType[indexValueActive].value;
      this.clientType = this.clientsType[response.cadastro_tipo_id - 1].value;
      this.clientFantasy = response.fantasia;
      this.alterName = this.alterNameType[indexValueAlter].value;
      this.clientRG = response.rg_ie;
      this.clientPhone = response.fone;
      this.clientCellphone = response.celular;
      this.cep = response.cadastro_endereco_padrao.endereco_cep;
      this.uf = response.cadastro_endereco_padrao.endereco_uf_sigla;
      this.country =
        response.cadastro_endereco_padrao.endereco_municipio_descricao;
      this.adress = response.cadastro_endereco_padrao.endereco;
      this.neighborhood = response.cadastro_endereco_padrao.endereco_bairro;
      this.number = response.cadastro_endereco_padrao.endereco_numero;
      this.iePR = response.cadastro_endereco_padrao.ie_produtor_rural;
      this.description = response.cadastro_endereco_padrao.descricao;
      this.adressIBGE = response.cadastro_endereco_padrao.endereco_municipio_codigo_ibge;
    });
  }

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

  saveData() {
    let clientsData = {
      ...this.clientData,
      id: this.id,
      nome: this.clientName,
      fantasia: this.clientFantasy,
      tipo_pessoa: this.personType,
      tipo_cadastro: this.registerType,
      cadastro_tipo_id: parseInt(this.clientType),
      cpf_cnpj: this.clientCPF_CNPJ,
      rg_ie: this.clientRG,
      fone: this.clientPhone,
      celular: this.clientCellphone,
      chk_alterar_nome: Boolean(this.alterName),
      desconto_auto_aplicar: this.autoDiscount > 0 ? true : false,
      ativo: Boolean(this.status),
      cadastro_endereco_padrao: {
        ...this.adressData,
        descricao: this.description,
        endereco: this.adress,
        endereco_numero: this.number,
        endereco_bairro: this.neighborhood,
        endereco_cep: this.cep,
        endereco_municipio_codigo_ibge: parseInt(this.adressIBGE),
        ie_produtor_rural: this.iePR,
      },
    };
    this.clientService
      .updateClient(clientsData, String(this.id))
      .then((response: any) => {
        if (response) {
          alert('Cliente editado com sucesso');
        }
      });
  }
}
