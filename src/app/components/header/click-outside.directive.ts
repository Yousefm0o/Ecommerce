import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    const buttonClicked = event.target.classList.contains('user-img');

    if (!clickedInside && !buttonClicked) {
      this.clickOutside.emit();
    }
  }
}
