import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EventBusService } from '../event-bus.service';
import { SharedCategoryService } from '../shared-category.service';

@Component({
  selector: 'heading',
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css'
})
export class HeadingComponent {

  @Input() categories: Array<any> | undefined;

  // dropdownOpen = false;

  @Input() filter: string = "All"
  @Output() filterChange = new EventEmitter()

  fullWidth: boolean = false;
  columnsView: number = 3;

  searchText: string = '';

  constructor(private _eventService: EventBusService, private _sharedCategory: SharedCategoryService) {
  }

  // toggleDropdown() {
  //   this.dropdownOpen = !this.dropdownOpen;
  // }

  // selectOption(val: any) {
  //   this.changeFilter(val.name)
  //   this.dropdownOpen = false;
  // }

  changeFilter(_filter: string) {
    this.filter = _filter;
    this._sharedCategory.setData(_filter);
    this.searchText = '';
  }

  search() {
    this._eventService.emit("search", this.searchText)
  }

  LayoutOne() {
    this.fullWidth = true;
    this.columnsView = 1;
    // this._eventService.emit("view", {state: this.fullWidth, columns: this.columnsView, height: '450px'})
    this._eventService.emit("view", {state: this.fullWidth})
  }

  LayoutThree() {
    this.fullWidth = false;
    this.columnsView = 3;
    // this._eventService.emit("view", {state: this.fullWidth, columns: this.columnsView, height: '610px'})
    this._eventService.emit("view", {state: this.fullWidth})
  }



}
