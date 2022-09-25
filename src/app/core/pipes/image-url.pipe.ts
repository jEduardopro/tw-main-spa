import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '@app/modules/auth/interfaces/user.interface';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

	transform(image: Image, size: string = 'small'): string {
		let url = image.url;
		if (Object.keys(image.conversions).length > 0) {
			switch (size) {
				case 'large':
					url = image.conversions.large
					break;
				case 'small':
					url = image.conversions.small
					
					break;
				case 'thumb':
					url = image.conversions.thumb
					break;
				case 'medium':
					url = image.conversions.medium
					break;
			}
			return url;
		}
		return url;
  }

}
