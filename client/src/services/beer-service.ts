import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface IBeer {
  id: string;
  name: string;
  type: "lager" | "ipa" | "apa" | "stout" | "porter";
  note: string;
  alcohol: number;
  rate: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/beer';

  getBeers() {
    return this.http.get<IBeer[]>(this.API_URL);
  }


  getBeer(id: string) {
    return this.http.get<IBeer>(`${this.API_URL}/${id}`);
  }

  deleteBeer(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  createBeer(beer: IBeer) {
    return this.http.post(`${this.API_URL}`, beer);
  }

  updateBeer(id: string, beer: IBeer) {
    return this.http.put(`${this.API_URL}/${id}`, beer);
  }
}
