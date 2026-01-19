import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/core/models/donation';
import { DonationService } from 'src/app/core/services/donation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html',
  styleUrls: ['./donation-table.component.css']
})
export class DonationTableComponent implements OnInit {

  donations: Donation[] = [];

  p: number = 1;
  total: number = 0;

  constructor(private messageService: MessageService, private donationService: DonationService) { }

  ngOnInit(): void {
    this.loadDonations();
  }

  loadDonations(){
    this.donationService.getAllDonations().subscribe((rs)=> this.donations = rs);
  }

  deleteDonation(donationItem: Donation){
    Swal.fire({
      title: 'Está seguro de querer eliminar esta información?',
      text: `¡No podrás revertir esto! Banco a eliminar ${donationItem.banco_entidad}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar banco!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.donationService.deleteDonation(donationItem).subscribe({
          next: (e) => {
            this.loadDonations();
            Swal.fire(
              'Eliminado!',
              `El banco ${donationItem.banco_entidad} ha sido eliminado.`,
              'success'
            );
          },
          error: (e) => {
            this.messageService.errorMessage(
              environment.mensaje_eliminado_error
            );
          },
        });
      }
    });
  }
}
