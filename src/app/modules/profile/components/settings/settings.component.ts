import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { Profile } from '../../interfaces/profile.interface';
import { selectProfileInfo } from '../../store/selectors/profile.selectors';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { ProfileService } from '../../services/profile.service';
import { setProfile, toggleLoading } from '../../store/actions/profile.actions';
import { MediaService } from '@app/modules/media/services/media.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit, OnDestroy {

	profileSettings = false;
	storeSubscription: Subscription = new Subscription;
	profile!: Profile

	profileForm!: FormGroup
	bannerMediaFile: File | null = null;
	bannerImagePreview: string | null = null;

	constructor(
		private store: Store<AppState>,
		private profileService: ProfileService,
		private mediaService: MediaService,
		public customizeView: CustomizeViewService
	) { }

	ngOnInit(): void {
		const profileInfo$ = this.store.select(selectProfileInfo).subscribe(profile => {
			this.profile = profile!
		})

		this.storeSubscription.add(profileInfo$)
		this.setFormData()
	}
	
	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	get profileBannerImage() {
		if (!this.profile.banner) {
			return ''
		}
		return this.profile.banner.conversions.medium
	}
	
	toggleProfileSettings() {
		this.profileSettings = !this.profileSettings
	}

	openBannerFileChooser() {
		const inputBannerFile = document.getElementById('bannerFile')
		inputBannerFile?.click()
	}

	onBannerFileChange(event: Event) {
		const target = event.target as HTMLInputElement
		console.log(target.files);
		const file = target.files![0];
		if (!file) {
			this.bannerImagePreview = null
			this.bannerMediaFile = null
			return
		}
		this.bannerMediaFile = file
		this.bannerImagePreview = URL.createObjectURL(file)
	}

	openImageFileChooser() {
		const inputImageFile = document.getElementById('imageFile')
		inputImageFile?.click()
	}

	setFormData() {
		this.profileForm = new FormGroup({
			name: new FormControl(this.profile.name, [Validators.required]),
			description: new FormControl(this.profile.description, [Validators.maxLength(160)]),
			date_birth: new FormControl(this.profile.date_birth, [Validators.required]),
		})
	}

	async saveProfile() {
		this.store.dispatch(toggleLoading({status: true}))
		this.saveBanner()
		this.saveBasicInfo()
		this.store.dispatch(toggleLoading({status: false}))
	}

	async saveBasicInfo() {
		try {
			const response = await firstValueFrom(this.profileService.update(this.profileForm.value))
			this.store.dispatch(setProfile({ profile: response }))
			this.profileSettings = false
		} catch (error) {
			console.log(error);
		}
	}

	async saveBanner() {
		if (!this.bannerMediaFile) {
			return
		}

		try {
			const mediaForm = new FormData()
			mediaForm.append('media', this.bannerMediaFile)
			mediaForm.append('media_category', 'banner_image')
			const { media_id } = await firstValueFrom(this.mediaService.upload(mediaForm))
			const {profile_banner_url} = await firstValueFrom(this.profileService.updateBanner(media_id))
			// console.log({ response });
			const bannerImage = {
				id: "",
				url: profile_banner_url,
				conversions: {
					large: "",
					small: "",
					thumb: "",
					medium: "",
				},
				created_at: ""
			}
			this.store.dispatch(setProfile({ profile: {...this.profile, banner: bannerImage} }))
			
		} catch (error) {
			console.log(error);
		}
	}

}
