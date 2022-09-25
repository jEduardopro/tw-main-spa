import { MediaService } from "@app/modules/media/services/media.service";
import { ToastService } from "@app/shared/services/toast.service";
import { firstValueFrom } from "rxjs";

export class TweetMedia {

	media: string[] = [];
	mediaOutput!: HTMLElement

	constructor(
		private mediaService: MediaService,
		private toastService: ToastService,
		private tweetBox: HTMLElement
	) {

	}

	async setPreviewPhotos(e: Event) {		
		const target = e.target as HTMLInputElement
		const files = target.files
		if (!files || files.length == 0) {
			return;
		}
		if (files.length > 4) {
			this.toastService.toastInfo({title: 'Please choose either 1 GIF or up to 4 photos'})
			return
		}

		const mediaOutput = document.getElementById('previewPhotos')
		if (!mediaOutput) {
			this.mediaOutput = document.createElement('div') as HTMLElement
			this.mediaOutput.classList.add('flex', 'flex-wrap', 'flex-row', 'flex-grow', 'items-center', 'justify-between', 'mt-4', 'mb-2')
			this.mediaOutput.id = 'previewPhotos'
			this.tweetBox.appendChild(this.mediaOutput)
		} else {
			this.mediaOutput = mediaOutput
		}

		await this.uploadMediaFiles(files)

		// const removeMediaBtns = document.querySelectorAll('#previewPhotos div[aria-label="media"] button[aria-label="Remove media"]')
		
		// for (let i = 0; i < removeMediaBtns.length; i++) {
		// 	removeMediaBtns[i].firstChild?.removeEventListener('click', this.removePhoto)
		// 	removeMediaBtns[i].removeEventListener('click', this.removePhoto)
		// 	removeMediaBtns[i].addEventListener("click", (e) => this.removePhoto(e));
		// }
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
		removeMediaButton.addEventListener('click', (e) => this.removePhoto(e))
		
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
		if (this.media.length == 0) {
			this.mediaOutput.remove()
		}
		const mediaResponseDeleted = await firstValueFrom(this.mediaService.remove(mediaId!))
	}

}