import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { AccentColor } from '../../customize-view/interfaces/accent-color.interface';

@Pipe({
	name: 'formatTweetContent'
})
export class FormatTweetContentPipe implements PipeTransform {

	transform(value: string, mentions: User[], themeColor: AccentColor): string {
		
		const usersMentioned = mentions.map(um => `@${um.username}`);

		// console.log(value, mentions);
		const tweetBody = value.split(' ').reduce((acc, state) => {

			let word = state;
			if (usersMentioned.includes(state)) {
				word = `<a href="/${state.replace('@', '')}"  class="${themeColor.color} hover:underline">${state}</a>`
			}

			acc += `${word} `

			return acc;

		}, '')		

    return tweetBody.trimEnd();
  }

}
