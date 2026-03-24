import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { BeerService, IBeer } from '../../../services/beer-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-beer',
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  templateUrl: './beer.html',
  styleUrl: './beer.css',
})
export class Beer implements OnInit {
  private router = inject(Router);
  private beerService = inject(BeerService);
  private snackBar = inject(MatSnackBar);

  id: string = '';
  beer = signal<IBeer>({} as IBeer);
  beerForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    type: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    note: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    alcohol: new FormControl<number>(0, { validators: [Validators.required, Validators.min(0), Validators.max(14)], nonNullable: true }),
    rate: new FormControl<number>(0, { validators: [Validators.required, Validators.min(1), Validators.max(10)], nonNullable: true }),
  });
  beerTypes = ['lager', 'ipa', 'apa', 'stout', 'porter'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (!params.get('id')) {
        this.router.navigate(['404']);
        return;
      }

      this.id = params.get('id') as string;

      if (this.id != 'new') {
        this.beerService.getBeer(this.id).subscribe((data) => {
          this.beer.set(data);
          this.beerForm.setValue({
            name: data.name,
            type: data.type,
            note: data.note,
            alcohol: data.alcohol,
            rate: data.rate,
          });
        });
      } else {
        this.beerForm.setValue({
          name: 'New Beer',
          type: '',
          note: '',
          alcohol: 0,
          rate: 0,
        });
      }
    });
  }

  deleteBeer(): void {
    if (this.id && this.id != 'new') {
      this.beerService.deleteBeer(this.id).subscribe(() => {
        this.router.navigate(['/app/home']);
      });
    }
  }

  onSubmit(): void {
    if (this.beerForm.valid) {
      if (this.id == 'new') {
        this.beerService.createBeer(this.beerForm.value as IBeer).subscribe({
          next: (data) => {
            const beerId = (data as IBeer).id;
            this.router.navigate(['/app/beer', beerId]);
            this.showSnackBar('Beer created successfully');
          },
          error: (err) => {
            this.showSnackBar('Something went wrong');
          },
        });
      } else {
        this.beerService.updateBeer(this.id, this.beerForm.value as IBeer).subscribe(() => {
          this.showSnackBar('Beer updated successfully');
        });
      }
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
