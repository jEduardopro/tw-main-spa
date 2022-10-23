import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Image } from '../../../auth/interfaces/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { selectProfileBanner } from '../../store/selectors/profile.selectors';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [
  ]
})
export class BannerComponent implements OnInit, OnDestroy{

	banner: Image | null | undefined = null
	showPreview = false;
	storeSubscription: Subscription = new Subscription;

	constructor(
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		const banner$ = this.store.select(selectProfileBanner).subscribe(banner => {
			this.banner = banner
		})
		this.storeSubscription.add(banner$)
	}
	
	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	openPreview() {
		this.showPreview = true;
	}

	closePreview() {
		this.showPreview = false;
	}
}
