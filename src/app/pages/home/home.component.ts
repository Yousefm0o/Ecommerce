import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsAPIService } from '../products/products-api.service';
import { Subscription, filter, interval } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedCategoryService } from '../products/shared-category.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EventBusService } from '../products/event-bus.service';

let hosts: string[] = []

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  step = 1;

  categories: Array<any> | undefined;

  categoriesSubscription: Subscription | undefined;

  constructor(private _router: Router, private route: ActivatedRoute ,private productsApi: ProductsAPIService, private _sharedCategory: SharedCategoryService, private _eventService: EventBusService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.productsApi.getCategories().subscribe({
      next: (_categories) => {
        this.categories = _categories
      }
    })
    this._eventService.listen('scroll-to', (target) => {
      const targetElement: HTMLElement | any = document.getElementById(target);
      const targetPosition = targetElement?.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY < targetPosition) {
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }
    })
  }

  scrollBottom(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  get categoriesNumber (): number {
    if (this.categories) {
      return this.categories.length;
    }
    return 0
  }

  goToCategory(_category: any): void {
    this._sharedCategory.setData(_category.name)
    this._router.navigate(['/products']);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  highlightPreviousTiles(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const index = tiles.indexOf(target);
    tiles.slice(0, index).forEach(prevTile => {
      prevTile.classList.add('selected');
    });
  }

  removeHighlight(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const tiles = Array.from(document.querySelectorAll('.tile'));
    tiles.forEach(prevTile => {
      prevTile.classList.remove('selected');
    });
  }

  groupForm = new FormGroup({
    senderName : new FormControl("", [Validators.required, Validators.minLength(3)]),
    senderEmail : new FormControl("", [Validators.required, Validators.email, this.invalidEmail]),
    senderMessage : new FormControl("", [Validators.required, Validators.minLength(10)])
  })

  submitForm() {
    console.log(this.groupForm.valid)
    console.log(this.groupForm.value);
    this.groupForm.get("senderMessage")?.reset();
    this.groupForm.reset()
  }

  private invalidEmail(control: AbstractControl): ValidationErrors | null {
    let value = control.value?.toLowerCase()
    let matches = hosts.some(host => value.indexOf(`@${host}`) > -1);
    console.log(!matches)
    return matches ? {invalidDomain: true} : null;
  }

  scrollRight() {
    document.querySelector('#row')?.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }

  scrollLeft() {
    document.querySelector('#row')?.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }

  ngAfterViewInit() {
    this.scrollToPosition(10); // Scroll horizontally to 200px, adjust as needed
  }

  scrollToPosition(position: number) {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
        this.scrollContainer.nativeElement.scrollLeft = position;
    }
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
  }

}
