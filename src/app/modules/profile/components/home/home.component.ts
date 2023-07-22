import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Profile } from '../../interfaces/profile.interface';
import { selectProfileInfo } from '../../store/selectors/profile.selectors';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

	profile: Profile|null = null
	storeSubscription: Subscription = new Subscription;

	constructor(
		private store: Store<AppState>,
		private navigationService: NavigationService
	) { }

	ngOnInit(): void {
		const profileInfo$ = this.store.select(selectProfileInfo).subscribe(profile => {
			if (!profile) {
				return
			}
			this.profile = profile
		})

		this.storeSubscription.add(profileInfo$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	get profileFound() {
		return this.profile != null
	}

	goToBack() {
		this.navigationService.back()
	}
}
