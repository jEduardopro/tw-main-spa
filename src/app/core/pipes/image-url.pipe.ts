import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '@app/modules/auth/interfaces/user.interface';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

	transform(image: Image, size: 'small'|'large'|'thumb'|'medium'): string {
		let url = null;
		if (Object.keys(image.conversions).length > 0) {
			switch (size) {
				case 'large':
					url = image.conversions.large || null
					break;
				case 'small':
					url = image.conversions.small || null
					
					break;
				case 'thumb':
					url = image.conversions.thumb || null
					break;
				case 'medium':
					url = image.conversions.medium || null
					break;
			}
		}
		if (!url) {
			url = image.url
		}
		return url;
  }

}
