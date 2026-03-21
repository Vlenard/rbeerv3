import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-landing',
  imports: [
    MatButtonModule
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
