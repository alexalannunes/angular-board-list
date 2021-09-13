import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgidService {
  init = 0;

  next() {
    return this.init++;
  }
}
