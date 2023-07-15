import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { Profile } from '../../interfaces/profile.interface';
import { selectProfileInfo } from '../../store/selectors/profile.selectors';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { ProfileService } from '../../services/profile.service';
import { setProfile } from '../../store/actions/profile.actions';
import { MediaService } from '@app/modules/media/services/media.service';
import * as httpErrorSelectors from '@app/shared/store/selectors/http-error.selectors';

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
	errors: any = {};

	profileForm!: FormGroup
	bannerMediaFile: File | null = null;
	bannerImagePreview: string | null = null;
	imageMediaFile: File | null = null;
	imagePreview: string | null = null;

	constructor(
		private store: Store<AppState>,
		private profileService: ProfileService,
		private mediaService: MediaService,
		public customizeView: CustomizeViewService
	) { }

	ngOnInit(): void {
		console.log('ngOnInit SettingsComponent');
		
		const profileInfo$ = this.store.select(selectProfileInfo).subscribe(profile => {
			this.profile = JSON.parse(JSON.stringify(profile!))
		})

		const errors$ = this.store.select(httpErrorSelectors.selectFieldErrors).subscribe(fieldErrors => {
			if (fieldErrors) {
				this.errors = fieldErrors
				return;
			}
			this.errors = {}
		})

		this.storeSubscription.add(profileInfo$)
		this.storeSubscription.add(errors$)
		this.setFormData()
	}
	
	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
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

	onImageFileChange(event: Event) {
		const target = event.target as HTMLInputElement
		const file = target.files![0];
		if (!file) {
			this.imagePreview = null
			this.imageMediaFile = null
			return
		}
		this.imageMediaFile = file
		this.imagePreview = URL.createObjectURL(file)
	}

	setFormData() {
		this.profileForm = new FormGroup({
			name: new FormControl(this.profile.name, [Validators.required]),
			description: new FormControl(this.profile.description, [Validators.maxLength(160)]),
			date_birth: new FormControl(this.profile.date_birth, [Validators.required]),
		})
	}

	async saveProfile() {
		this.saveBanner()
		this.saveImage()
		this.saveBasicInfo()
	}

	async saveBasicInfo() {
		try {
			const response = await firstValueFrom(this.profileService.update(this.profileForm.value))
			this.store.dispatch(setProfile({ profile: {...this.profile, ...response} }))
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
			const { profile_banner_url } = await firstValueFrom(this.profileService.updateBanner(media_id))
			this.bannerMediaFile = null
			this.bannerImagePreview = null

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

	async saveImage() {
		if (!this.imageMediaFile) {
			return
		}

		try {
			const mediaForm = new FormData()
			mediaForm.append('media', this.imageMediaFile)
			mediaForm.append('media_category', 'profile_image')
			const { media_id } = await firstValueFrom(this.mediaService.upload(mediaForm))
			const { profile_image_url } = await firstValueFrom(this.profileService.updateImage(media_id))
			this.imageMediaFile = null
			this.imagePreview = null
			const profileImage = {
				id: "",
				url: profile_image_url,
				conversions: {
					large: "",
					small: "",
					thumb: "",
					medium: "",
				},
				created_at: ""
			}
			this.store.dispatch(setProfile({ profile: {...this.profile, image: profileImage} }))
			
		} catch (error) {
			console.log(error);
		}
	}

}
