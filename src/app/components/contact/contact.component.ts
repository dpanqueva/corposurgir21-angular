import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/core/models/contact';
import { ContactService } from 'src/app/core/services/contact.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  siteKey: string = "6LdRF9skAAAAAGQiIRgQ2O_tZ71lNuSVO9MppDLH";
  errors: string[] = [];

  contact: Contact = new Contact();

  constructor(private router: Router,
    private contactService:ContactService,
    private messageService: MessageService,

   ) {}

  ngOnInit(): void {

  }

  loadContact() {
    this.contact = new Contact();
  }

  createContact() {
    this.contactService.createContact(this.contact).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.contacto_registrado_ok);
        this.loadContact();
        this.router.navigate(['/contactanos']);
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  private errorBadRequest(e: any) {
    let cont = 0;
    if (e.status == 400) {
      cont = this.buildLstErrors(
        e.error.error.nombre_caracteristica as string,
        cont
      );
      cont = this.buildLstErrors(e.error.error.correo as string, cont);
      cont = this.buildLstErrors(e.error.error.numero_contacto as string, cont);
      cont = this.buildLstErrors(e.error.error.tipo_contacto as string, cont);
      cont = this.buildLstErrors(e.error.error.mensaje as string, cont);
    }
  }

  private buildLstErrors(e: string, cont: number) {
    if (e !== undefined && e !== null) {
      this.errors[cont] = e;
      cont++;
    }
    return cont;
  }

}
