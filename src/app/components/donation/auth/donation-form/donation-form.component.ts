import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Donation } from 'src/app/core/models/donation';
import { DonationService } from 'src/app/core/services/donation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
})
export class DonationFormComponent implements OnInit {
  donation: Donation = new Donation();
  errors: string[] = [];

  constructor(
    private router: Router,
    private donationService: DonationService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDonation();
  }

  loadDonation() {
    this.activateRoute.params.subscribe((params) => {
      let donationId = params['donationId'];
      if (donationId) {
        this.donation.donacion_id = donationId;
        this.donationService
          .getDonationId(donationId)
          .subscribe((rs) => (this.donation = rs));
      }
    });
  }

  createDonation() {
    this.donation.logo = 'bi bi-bank2';
    this.donationService.createDonation(this.donation).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
        this.router.navigate(['/modulo-informacion-bancaria']);
      },
      error: (e) => {
        this.errorBadRequest(e);
      },
    });
  }

  updateDonation() {
    this.donation.logo = 'bi bi-bank2';
    this.donationService.updateDonation(this.donation,this.donation.donacion_id.toString()).subscribe({
      next: (e) => {
        this.messageService.successFullMessage(environment.mensaje_creado_ok);
        this.router.navigate(['/modulo-informacion-bancaria']);
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
      cont = this.buildLstErrors(e.error.error.banco_entidad as string, cont);
      cont = this.buildLstErrors(e.error.error.numero_cuenta as string, cont);
      cont = this.buildLstErrors(e.error.error.tipo_cuenta as string, cont);
      cont = this.buildLstErrors(e.error.error.logo as string, cont);
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
