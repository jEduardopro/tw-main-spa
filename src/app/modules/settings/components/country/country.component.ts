import { Component } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import countriesJson from '@app/core/utils/countries.json'
import { AccountPersonalizationService } from '../../services/account-personalization.service';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: [
  ]
})
export class CountryComponent {

	onFocus = false;
	country = 'United States'
	countries = countriesJson

	constructor(
		public customizeView: CustomizeViewService,
		private accountPersonalizationService: AccountPersonalizationService,
		private toastService: ToastService,
	) { }
	
	async updateCountry() {
		try {
			const { message } = await firstValueFrom(this.accountPersonalizationService.updateCountry(this.country))
			this.toastService.toastSuccess({ title: message})
		} catch (error) {
			
		}
	}

}
