import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { MentionConfig } from 'angular-mentions';


@Component({
	selector: 'app-new-tweet',
	templateUrl: './new-tweet.component.html',
	styles: [
	]
})
export class NewTweetComponent implements OnInit {

	tweet = '';
	remaining = 280;
	limitCharacters = 280;
	tick: any = null;

	items: string[] = ["Noah", "Liam", "Mason", "Jacob"]

	mentionConfig: MentionConfig = {
		mentions: [
			{
				items: ["Noah", "Liam", "Mason", "Jacob"],
				triggerChar: '@',
				returnTrigger: true,
				dropUp: false
					
				// mentionSelect(item, triggerChar?) {
				// 	console.log({item, triggerChar});
				// 	return `<span class="menu-highlighted">${item.label}</span>`;
				// },
			},
			{
				items: ["Red", "Yellow", "Green"],
				triggerChar: '#',
				// mentionSelect(item, triggerChar?) {
				// 	console.log({item, triggerChar});
				// 	return item;
				// },
			}
		]
	}

	inputFile!: HTMLInputElement

	constructor(
		public customizeViewService: CustomizeViewService
	) { }

	ngOnInit(): void {
		this.inputFile = document.getElementById('tweetInputMedia') as HTMLInputElement
		this.inputFile.addEventListener('change', this.setPreviewPhotos)
	}

	get shouldBeDisabled() {
		return this.tweet.trim().length == 0
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

		this.remaining = this.limitCharacters - this.tweet.length

		this.updateCircleProgressCharacters()
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

	setPreviewPhotos(e: Event) {
		const target = e.target as HTMLInputElement
		const files = target.files
		if (!files) {
			return;
		}

		const output = document.getElementById('previewPhotos') as HTMLElement
		if (!output) {
			return;
		}

		const mediaForm = new FormData()

		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			if (!file.type.match('image'))
				continue;
			
			mediaForm.append('media', file)
			mediaForm.append('media_category', 'tweet_image')
			
			let reader = new FileReader();

			reader.onload = (event) => {
				const picFile:any = event.target
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
				
				const trashIcon = document.createElement('i')
				trashIcon.classList.add('fas', 'fa-times', 'text-md', 'text-twitter-white-100')
				
				removeMediaButton.appendChild(trashIcon)


				const image = document.createElement('img')
				image.classList.add('rounded-lg', 'w-full', 'h-full')
				image.src = picFile.result

				media.appendChild(removeMediaButton)
				media.appendChild(image)
				output.appendChild(media)
			}

			reader.readAsDataURL(file);
		}

		setTimeout(() => {
			const removeMediaBtns = document.querySelectorAll('#previewPhotos div[aria-label="media"] button[aria-label="Remove media"]')
			console.log({removeMediaBtns});
			
			for (let i = 0; i < removeMediaBtns.length; i++) {
				removeMediaBtns[i].addEventListener("click", function() {
					console.log('click remove media');
					
				});
			}
		}, 1000);
	}
}