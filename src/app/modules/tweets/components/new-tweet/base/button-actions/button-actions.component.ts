import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { MediaService } from '@app/modules/media/services/media.service';
import { ToastService } from '@app/shared/services/toast.service';
import { TweetMedia } from '../../concerns/tweet-media.class';

@Component({
  selector: 'app-button-actions',
  templateUrl: './button-actions.component.html',
  styles: [
  ]
})
export class ButtonActionsComponent implements OnInit, AfterViewInit, OnChanges {

	@Input() body: string = '';
	@Input() creating: boolean = false;
	@Output() changeMedia = new EventEmitter<string[]>()
	@Output() save = new EventEmitter()

	limitCharacters = 280;
	remaining = 280;

	inputFile!: HTMLInputElement;
	tweetBox!: HTMLElement;
	tweetMedia!: TweetMedia;


	constructor(
		public customizeViewService: CustomizeViewService,
		private mediaService: MediaService,
		private toastService: ToastService,
	) { }

  ngOnInit(): void {
		this.tweetBox = document.getElementById('tweetBox') as HTMLElement
		this.tweetMedia = new TweetMedia(this.mediaService, this.toastService, this.tweetBox);
	}

	ngAfterViewInit(): void {
		this.inputFile = document.getElementById('tweetInputMedia') as HTMLInputElement
		this.inputFile.addEventListener('change', (e) => this.tweetMedia.setPreviewPhotos(e))
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['body']) { 
			this.updateRemainingCharacters()
			this.updateCircleProgressCharacters()
		}
		if (changes['creating']) {
			const creating = changes['creating']
			if (creating.currentValue == false && !creating.isFirstChange()) {
				this.tweetMedia.media = []
				this.tweetMedia.mediaOutput.remove()
			}
		}
	}
	
	get shouldBeDisabled() {
		if (!this.tweetMedia) {
			return true;
		}
		return this.body.trim().length == 0 && this.tweetMedia.media.length == 0
	}

	get mediaButtonShouldBeDisabled() {
		return this.tweetMedia.media.length == 4
	}

	get shouldBeAcceptMultipleFiles() {
		return this.tweetMedia.media.length == 0 ? true : false;
	}

	get circleProgressCharacters() {
		if (this.shouldBeDisabled) {
			return 0
		}
		return Math.round((this.body.length * 100) / this.limitCharacters)
	}

	updateRemainingCharacters() {
		this.remaining = this.limitCharacters - this.body.length
	}

	updateCircleProgressCharacters() {
		const progressBar = document.querySelector('.circle-progressbar') as HTMLElement
		if (!progressBar) {
			return;
		}
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
		if (this.mediaButtonShouldBeDisabled) {
			return;
		}
		this.inputFile?.click()
	}

	saveTweet() {
		if (this.shouldBeDisabled) {
			return;
		}
		const media = this.tweetMedia.media
		this.changeMedia.emit(media)
		this.save.emit()
	}

}
