import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgidService {
  init = btoa(Date.now().toString(16));

  next() {
    this.init = btoa(Date.now().toString(16));
    return this.init;
  }
}
