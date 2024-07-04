import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedCategoryService {

  private sharedCategory: string = "All";

  constructor() { }

  setData(data: any): void {
    this.sharedCategory = data;
  }

  getData(): any {
    return this.sharedCategory;
  }
}
