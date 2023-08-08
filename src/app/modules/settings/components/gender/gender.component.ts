import { Component } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AccountPersonalizationService } from '../../services/account-personalization.service';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '@app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styles: [
  ]
})
export class GenderComponent {

	gender: 'male'|'female'|'addGender' = 'male'
	newGender: 'male'|'female'|'addGender' = 'male'
	ownGender = ''
	onFocus = false;
	saving = false;

	constructor(
		public customizeView: CustomizeViewService,
		private accountPersonalizationService: AccountPersonalizationService,
		private toastService: ToastService,
		private router: Router
	) { }

	get shouldBeDisabled() {
		return this.gender === this.ownGender ||
			this.saving ||
			this.gender === this.newGender ||
			(this.newGender === 'addGender' && this.ownGender.length === 0)
	}

	async saveGender() {
		this.saving = true
		try {
			const { message } = await firstValueFrom(this.accountPersonalizationService.updateGender(this.newGender))
			this.toastService.toastSuccess({ title: message })
			this.router.navigate(['/settings/your_twitter_data/account'])			
		} catch (error) {
			
		}
		this.saving = false
	}

}
