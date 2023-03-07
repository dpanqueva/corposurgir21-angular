import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/core/models/donation';
import { DonationService } from 'src/app/core/services/donation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

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

}
