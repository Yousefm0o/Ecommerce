import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { EventBusService } from '../event-bus.service';
import { SharedCategoryService } from '../shared-category.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
export const CustomBreakpoints = {
  HandsetPortraitMin: '(max-width: 400px)',
  HandsetPortrait: '(max-width: 576px)',
  HandsetMid2: '(max-width: 640px)',
  HandsetMid: '(max-width: 710px)',
  HandsetLandscape: '(max-width: 767px)',
  TabletPortrait: '(max-width: 992px)',
  TabletLandscape: '(max-width: 1200px)',
  TabletLandscapeMax: '(max-width: 1280px)',
  Web: '(min-width: 1281px)'
};

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  @Input() products: Array<Product> | undefined;

  filter: string = "All"

  search: any = "";

  columnsView: number = 3;
  // columnsView: number = 2;
  // columnsView = "var(--cols)"
  widthState: boolean = false;
  height: string = '585px'
  // height: string = '415px'
  // height = 'var(--row-height)'

  currentScreenWidth: any;

  constructor(private _eventService: EventBusService, private _sharedCategory: SharedCategoryService, private breakpointObserver: BreakpointObserver) {
    this._eventService.listen("search", (text: string) => {
      if (text.length > 0) {
        this.search = new RegExp(`^${text}`, "i");
      } else {
        this.search = ""
      }
    })

    this._eventService.listen("view", (data: any) => {
      this.widthState = data.state;
      // this.columnsView = data.columns;
      // this.height = data.height;
      if (data.state) {
        this.layoutOne(this.currentScreenWidth);
      } else {
        this.layoutThree(this.currentScreenWidth);
      }
    })

    this.filter = this._sharedCategory.getData();
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      CustomBreakpoints.HandsetPortraitMin,
      CustomBreakpoints.HandsetPortrait,
      CustomBreakpoints.HandsetMid2,
      CustomBreakpoints.HandsetMid,
      CustomBreakpoints.HandsetLandscape,
      CustomBreakpoints.TabletPortrait,
      CustomBreakpoints.TabletLandscape,
      CustomBreakpoints.TabletLandscapeMax,
      CustomBreakpoints.Web
    ]).subscribe((result: BreakpointState) => {
      this.updateGridProperties(result);
      this.currentScreenWidth = result
    });

    // throw new Error('Method not  implemented.');
  }

  updateGridProperties(result: BreakpointState): void {
    if (result.breakpoints[CustomBreakpoints.HandsetPortraitMin]) {
      this.columnsView = 2;
      this.height = '410px';
    } else if (result.breakpoints[CustomBreakpoints.HandsetPortrait]) {
      this.columnsView = 2;
      this.height = '470px'
    } else if (result.breakpoints[CustomBreakpoints.HandsetMid2]) {
      this.columnsView = 2;
      this.height = '430px'
    } else if (result.breakpoints[CustomBreakpoints.HandsetMid]) {
      this.columnsView = 2;
      this.height = '470px'
    } else if (result.breakpoints[CustomBreakpoints.HandsetLandscape]) {
      this.columnsView = 2;
      this.height = '500px'
    } else if (result.breakpoints[CustomBreakpoints.TabletPortrait]) {
      this.columnsView = 2;
      this.height = '525px';
    } else if (result.breakpoints[CustomBreakpoints.TabletLandscape]) {
      this.columnsView = 3;
      this.height = '525px';
    } else if (result.breakpoints[CustomBreakpoints.TabletLandscapeMax]) {
      this.columnsView = 3;
      this.height = '545px';
    } else if (result.breakpoints[CustomBreakpoints.Web]) {
      this.columnsView = 3;
      this.height = '610px';
    }
    else {
      this.columnsView = 3;
      this.height = '610px';
    }
  }

  // updateView(result: BreakpointState): void {
  //   this._eventService.listen("view", (data: any) => {
  //       this.widthState = data.state;
  //       // this.columnsView = data.columns;
  //       // this.height = data.height;
  //       if (data.state && result.breakpoints[CustomBreakpoints.TabletPortrait]) {

  //       }
  //     })
  // }

  layoutOne(width: BreakpointState) {
    if (width.breakpoints[CustomBreakpoints.TabletPortrait]) {
      this.columnsView = 1;
      this.height = '470px';
    } else if (width.breakpoints[CustomBreakpoints.TabletLandscape]) {
      this.columnsView = 1;
      this.height = '470px';
    } else if (width.breakpoints[CustomBreakpoints.TabletLandscapeMax]) {
      this.columnsView = 1;
      this.height = '470px';
    } else if (width.breakpoints[CustomBreakpoints.Web]) {
      this.columnsView = 1;
      this.height = '470px';
    }
    else {
      this.columnsView = 1;
      this.height = '470px';
    }
  }

  layoutThree(width: BreakpointState) {
    if (width.breakpoints[CustomBreakpoints.TabletPortrait]) {
      this.columnsView = 2;
      this.height = '525px';
    } else if (width.breakpoints[CustomBreakpoints.TabletLandscape]) {
      this.columnsView = 3;
      this.height = '525px';
    } else if (width.breakpoints[CustomBreakpoints.TabletLandscapeMax]) {
      this.columnsView = 3;
      this.height = '545px';
    } else if (width.breakpoints[CustomBreakpoints.Web]) {
      this.columnsView = 3;
      this.height = '610px';
    }
    else {
      this.columnsView = 3;
      this.height = '610px';
    }
  }

  get filteredProducts(): Array<Product> | any {
    this.filter = this._sharedCategory.getData()
    return this.products?.filter(product => {
      if (this.filter === "All") {
        return true;
      }
      return product.category.name === this.filter
    })
  }

  get searchedProducts(): Array<Product> | any {
    return this.filteredProducts?.filter((product: Product) => {
      if (this.search === "") {
        return true;
      }
      return product.title.split(" ").some(word => this.search.test(word))
    })
  }

}
