import { Component, OnInit } from '@angular/core';
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
export class AddComponent implements OnInit {
  clients: any[] = [];

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

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.listClients().then((response: any) => {
      this.clients = response.itens || [];
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
      this.adressIBGE = response.ibge;
    });
  }

  saveData() {
    const bodyData = {
      nome: this.clientName,
      fantasia: this.clientFantasy,
      tipo_pessoa: this.personType,
      tipo_cadastro: this.registerType,
      cadastro_grupo_id: null,
      cadastro_tipo_id: parseInt(this.clientType),
      cadastro_profissao_id: null,
      cpf_cnpj: this.clientCPF_CNPJ,
      rg_ie: this.clientRG,
      rg_ie_uf: null,
      ie_diferido: null,
      dt_nascimento: null,
      vlr_limite_credito: null,
      obs_venda: null,
      fone: this.clientPhone,
      fax: null,
      celular: this.clientCellphone,
      site: null,
      email: null,
      sexo: null,
      estado_civil: null,
      naturalidade_cidade: null,
      naturalidade_uf: null,
      nome_pai: null,
      nome_mae: null,
      qtd_dependentes: null,
      dados_prof_nome_empresa: null,
      dados_prof_cnpj: null,
      dados_prof_fone: null,
      dados_prof_data_admissao: null,
      dados_prof_ocupacao: null,
      dados_prof_cargo: null,
      dados_prof_vlr_renda_mensal: null,
      dados_prof_vlr_outras_rendas: null,
      dados_prof_endereco: null,
      dados_prof_endereco_numero: null,
      dados_prof_endereco_bairro: null,
      dados_prof_endereco_cep: null,
      dados_prof_endereco_municipio_codigo_ibge: null,
      dados_banc_num_banco: null,
      dados_banc_nome_banco: null,
      dados_banc_agencia: null,
      dados_banc_num_conta: null,
      dados_banc_tipo_conta: null,
      dados_banc_data_conta: null,
      dados_banc_fone_ag: null,
      dados_banc_obs: null,
      obs_geral: null,
      tipo_regime_apuracao: null,
      nome_conjuge: null,
      inscricao_municipal: null,
      dt_casamento: null,
      id_print_wayy: null,
      emp_id: 1,
      chk_emp_disponivel: true,
      chk_alterar_nome: Boolean(this.alterName),
      desconto_auto_aplicar: false,
      desconto_auto_aliq: null,
      obs_nfe: null,
      consumidor_final: false,
      tipo_preco_venda: null,
      cadastro_empresa_id: null,
      cadastro_empresa_guid: null,
      ativo: Boolean(this.status),
      dt_ultima_alteracao: null,
      usuario_ultima_alteracao_id: null,
      usuario_ultima_alteracao_nome: null,
      dt_inclusao: null,
      usuario_inclusao_id: null,
      guid: null,
      cadastro_endereco_padrao: {
        descricao: this.description,
        ativo: true,
        endereco: this.adress,
        endereco_numero: this.number,
        endereco_bairro: this.neighborhood,
        endereco_cep: this.cep,
        endereco_municipio_codigo_ibge: parseInt(this.adressIBGE),
        principal: true,
        cobranca: false,
        ie_produtor_rural: this.iePR,
      },
    };

    this.clientService.createClient(bodyData).then((response: any) => {
      if (response) {
          alert('Cliente criado com sucesso');
        }
    });
  }
}
