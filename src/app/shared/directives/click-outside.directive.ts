import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
	selector: '[clickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

	@Output() clickOutside = new EventEmitter<void>()

	docClickSubscription: Subscription | undefined;

	constructor(
		private element: ElementRef,
		@Inject(DOCUMENT) private document: Document
	) { }

	ngAfterViewInit(): void {
		this.docClickSubscription = fromEvent(this.document, 'click').pipe(
			filter(event => {
				return !this.isInside(event.target as HTMLElement)
			})
		).subscribe(() => {
			this.clickOutside.emit()
		})
	}

	ngOnDestroy(): void {
		this.docClickSubscription?.unsubscribe()
	}

	private isInside(elementToCheck: HTMLElement): boolean {
		return elementToCheck === this.element.nativeElement || this.element.nativeElement
				.contains(elementToCheck)
	}

}
