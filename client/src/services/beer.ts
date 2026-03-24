import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Beer {
  id: string;
  name: string;
  type: string;
  note: string;
  alcohol: number;
  rate: number;
  owner: string;
  createdAt: string; // or Date if you pipe it
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class Beer {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/beer';

  getBeers() {
    return this.http.get<Beer[]>(this.API_URL);
  }


  getBeer(id: string) {
    return this.http.get<Beer>(`${this.API_URL}/${id}`);
  }

  deleteBeer(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
