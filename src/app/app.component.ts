import { Component } from '@angular/core';
import { ClientService } from './services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projeto-angular';

  constructor(private router: Router, private clientService: ClientService) {
    this.clientService.login();
    this.clientService.listClients()
  }
}
