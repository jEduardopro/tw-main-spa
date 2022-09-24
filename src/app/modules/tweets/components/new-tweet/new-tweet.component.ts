import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { MediaService } from '@app/modules/media/services/media.service';
import { SearcherService } from '@app/modules/searcher/services/searcher.service';
import { ToastService } from '@app/shared/services/toast.service';
import { MentionConfig } from 'angular-mentions';
import { firstValueFrom } from 'rxjs';


@Component({
	selector: 'app-new-tweet',
	templateUrl: './new-tweet.component.html',
	styles: [
	]
})
export class NewTweetComponent implements OnInit {

	tweet = '';
	media: string[] = [];
	peopleMentioned: any[] = [];
	remaining = 280;
	limitCharacters = 280;

	mentionConfig: MentionConfig = {
		triggerChar: '@',
		labelKey: 'username',
		disableSearch: true,
	}

	people: any[] = []

	inputFile!: HTMLInputElement
	tweetBox!: HTMLElement
	mediaOutput!: HTMLElement

	constructor(
		public customizeViewService: CustomizeViewService,
		private mediaService: MediaService,
		private searcherService: SearcherService,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		this.inputFile = document.getElementById('tweetInputMedia') as HTMLInputElement
		this.inputFile.addEventListener('change', (e) => this.setPreviewPhotos(e))
		this.tweetBox = document.getElementById('tweetBox') as HTMLElement
	}

	get shouldBeDisabled() {
		return this.tweet.trim().length == 0 && this.media.length == 0
	}

	get circleProgressCharacters() {
		if (this.shouldBeDisabled) {
			return 0
		}
		return Math.round((this.tweet.length * 100) / this.limitCharacters)
	}
	
	updateTweet(event: Event) {
		const target = event.target as HTMLElement
		this.tweet = target.innerText

		this.syncMentions()
		this.updateRemainingCharacters();
		this.updateCircleProgressCharacters()
	}

	async searchPeople(q: string) {
		let peopleResponse = await firstValueFrom(this.searcherService.searchPeople(q))
		this.people = peopleResponse.data
	}

	syncMentions() {
		this.peopleMentioned.map(u => u.username).forEach(userName => {
			if (!this.tweet.includes(userName)) {	
				this.peopleMentioned = this.peopleMentioned.filter(u => u.username != userName)
			}
		})
	}

	saveMention(user: any) {
		this.peopleMentioned.push({username: `@${user.username}`, id: user.id})
	}

	updateRemainingCharacters() {
		this.remaining = this.limitCharacters - this.tweet.length
	}

	updateCircleProgressCharacters() {
		const progressBar = document.querySelector('.circle-progressbar') as HTMLElement
		progressBar.style.display = 'flex'
		if (this.shouldBeDisabled) {
			progressBar.style.display = 'none'
			return;
		}

		let backColor = this.customizeViewService.themeBackground.name == 'default' ? '#EFF3F4' : '#2F3336'
		let strokeColor = this.customizeViewService.themeColor.hex		

		if (this.remaining <= 20) {
			progressBar.style.width = '30px'
			progressBar.style.height = '30px'
			strokeColor = '#FFD400'
		}
		if (this.remaining > 20) {
			progressBar.style.width = '20px'
			progressBar.style.height = '20px'
		}
		if (this.remaining < 0) {
			strokeColor = '#F4212E'
		}

		progressBar.style.background = `conic-gradient(
			${strokeColor} ${this.circleProgressCharacters * 3.6}deg,
			${backColor} ${this.circleProgressCharacters * 3.6}deg
		)`;
	}

	openFileDialog() {
		this.inputFile?.click()
	}

	async setPreviewPhotos(e: Event) {		
		const target = e.target as HTMLInputElement
		const files = target.files
		if (!files) {
			return;
		}
		if (files.length > 4) {
			this.toastService.toastInfo({title: 'Please choose either 1 GIF or up to 4 photos'})
			return
		}

		this.mediaOutput = document.createElement('div') as HTMLElement
		this.mediaOutput.classList.add('flex', 'flex-wrap', 'flex-row', 'flex-grow', 'items-center', 'justify-between')
		this.mediaOutput.id = 'previewPhotos'
		this.tweetBox.appendChild(this.mediaOutput)

		await this.uploadMediaFiles(files)

		const removeMediaBtns = document.querySelectorAll('#previewPhotos div[aria-label="media"] button[aria-label="Remove media"]')
		
		for (let i = 0; i < removeMediaBtns.length; i++) {
			removeMediaBtns[i].addEventListener("click", (e) => this.removePhoto(e));
		}
	}

	async uploadMediaFiles(files: FileList) {
		for (let i = 0; i < files.length; i++) {
			
			let file = files[i];
			if (!file.type.match('image'))
				continue;
				
			const mediaForm = new FormData()
			mediaForm.append('media', file)
			mediaForm.append('media_category', 'tweet_image')

			let mediaResponse = await firstValueFrom(this.mediaService.upload(mediaForm))
			this.displayHTMLMedia(mediaResponse)
			this.media.push(mediaResponse.media_id)
		}
	}

	displayHTMLMedia(mediaData: any) {		
		const media = document.createElement('div')
		media.classList.add('w-60', 'h-36', 'rounded-lg', 'mb-2', 'relative')
		media.ariaLabel = 'media'
		media.setAttribute('role','group')

		const removeMediaButton = document.createElement('button')
		removeMediaButton.classList.add('absolute',
			'left-1', 'top-1', 'rounded-full', 'w-7', 'h-7', 'flex',
			'flex-col', 'text-center', 'items-center', 'justify-center',
			'bg-black', 'opacity-70'
		)
		removeMediaButton.ariaLabel = 'Remove media'
		removeMediaButton.title = 'Remove'
		removeMediaButton.setAttribute('data-media-id', mediaData.media_id)
		
		const trashIcon = document.createElement('i')
		trashIcon.classList.add('fas', 'fa-times', 'text-md', 'text-twitter-white-100')
		trashIcon.setAttribute('data-media-id', mediaData.media_id)
		removeMediaButton.appendChild(trashIcon)


		const image = document.createElement('img')
		image.classList.add('rounded-lg', 'w-full', 'h-full', 'object-cover')
		image.src = mediaData.media_url

		media.appendChild(removeMediaButton)
		media.appendChild(image)
		this.mediaOutput.appendChild(media)
	}

	async removePhoto(event: Event) {
		event.preventDefault()
		event.stopPropagation()
		const el = event.target as HTMLElement
		const mediaId = el.getAttribute('data-media-id')
		const mediaElement = el.closest('div[aria-label="media"]')
		mediaElement?.remove()
		this.media = this.media.filter(m => m != mediaId)
		const mediaResponseDeleted = await firstValueFrom(this.mediaService.remove(mediaId!))
	}
}