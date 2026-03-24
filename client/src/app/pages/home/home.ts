import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IBeer, BeerService } from '../../../services/beer-service';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatChipsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private beerService = inject(BeerService);

  beers = signal<IBeer[]>([]);

  ngOnInit() {
    this.beerService.getBeers().subscribe((data) => {
      this.beers.set(data);
    });
  }

  deleteBeer(id: string) {
    this.beerService.deleteBeer(id).subscribe(() => {
      this.beers.update((prev) => prev.filter((beer) => beer.id !== id));
    });
  }
}
