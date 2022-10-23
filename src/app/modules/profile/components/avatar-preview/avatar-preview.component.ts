import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { Image } from '../../../auth/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { selectProfileImage } from '../../store/selectors/profile.selectors';

@Component({
	selector: 'app-avatar-preview',
	templateUrl: './avatar-preview.component.html',
	styles: [
	]
})
export class AvatarPreviewComponent implements OnInit, OnDestroy {

	image: Image|null|undefined = null
	showPreview = false;
	storeSubscription: Subscription = new Subscription;

	constructor(
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		const profileImage$ = this.store.select(selectProfileImage).subscribe(image => this.image = image)
		this.storeSubscription.add(profileImage$)
	}
	
	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	openPreview() {
		this.showPreview = true;
	}
	
	closePreview() {
		console.log('hers hsjhj s');
		
		this.showPreview = false;
	}
}
