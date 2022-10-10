import { Component, OnInit } from '@angular/core';
import { CentralImage } from 'src/app/core/models/central-image';
import { CentralImageService } from 'src/app/core/services/central-image.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images: CentralImage[];

  constructor(private imageClient: CentralImageService) { }

  ngOnInit(): void {
    this.imageClient.getCentralImages().subscribe(
      image =>{
        debugger;
        this.images = image;
      }
    );
  }

}
