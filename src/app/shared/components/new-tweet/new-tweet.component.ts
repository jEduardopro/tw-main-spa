import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounce } from 'rxjs';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styles: [
  ]
})
export class NewTweetComponent implements OnInit, AfterViewInit {


	tweet = ''
	tick: any = null;

	@ViewChild('draftEditorContent') contentEdtibale!: ElementRef<HTMLElement>;

  constructor() { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		console.log(this.contentEdtibale.nativeElement);
		
	}
	
	get showPlaceholder(): boolean {
		return this.tweet.trim().length == 0
	}

	updateTweet(event: Event) {
		console.log(event.target);
		const target = event.target as HTMLElement
		const value = target.innerText
		const htmlValue = target.innerHTML
		const textContent = target.textContent
		console.log('value: ', value);
		console.log('htmlValue: ', htmlValue);
		console.log('textContent: ', textContent);

		clearTimeout(this.tick)

		this.tick = setTimeout(() => {
			this.updateBody(value)
		}, 300);

		// let range = window.getSelection()!.getRangeAt(0);

		// const currentCursorPos = this.getCharacterOffsetWithin(range)
		// console.log({currentCursorPos});
		
		// this.tweet = value

		// this.updateCP(currentCursorPos)

		// const matchWidthAtSign = value.match(/@(\w+)/g)

		// console.log(matchWidthAtSign);
		
	}

	updateBody(value:string) {
		console.log('value: ', value);

		let range = window.getSelection()!.getRangeAt(0);

		const currentCursorPos = this.getCharacterOffsetWithin(range)
		console.log({currentCursorPos});
		
		this.tweet = `<span>${value}</span>`

		this.updateCP(currentCursorPos)
	}

	getCharacterOffsetWithin(range: any) {
		var treeWalker:any = document.createTreeWalker(
			this.contentEdtibale.nativeElement as Node,
			NodeFilter.SHOW_TEXT,
			function (node) {
				var nodeRange = document.createRange();
				nodeRange.selectNodeContents(node);
				return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
					NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
			}
		);

		var charCount = 0;
		while (treeWalker.nextNode()) {
			charCount += treeWalker.currentNode.length;
		}
		if (range.startContainer.nodeType == 3) {
			charCount += range.startOffset;
		}
		return charCount;
	}

	updateCP(currentCursorPosition: number) {
		const contentEditable: any = this.contentEdtibale.nativeElement
		let nodeName = contentEditable.nodeName
		if(!contentEditable.childNodes[0].length) {
			return
		}
		console.log('hdh: ', contentEditable.childNodes[0]);

		// if (contentEditable.childNodes[0]) {
		// 	const childNodeStr = contentEditable.childNodes[0] as string;
		// }
		
		let finalCursorPosition = currentCursorPosition;
		if (currentCursorPosition > contentEditable.childNodes[0].length) {
			finalCursorPosition = contentEditable.childNodes[0].length;
		}

		if (nodeName == 'DIV') {
			console.log('final cursor position here: ', finalCursorPosition);
			
			let setpos = document.createRange()
			let set = window.getSelection()
			setpos.setStart(contentEditable.childNodes[0], finalCursorPosition)
			setpos.collapse(true)
			set?.removeAllRanges()
			set?.addRange(setpos)
			contentEditable.focus()
		}
	}


  // getSelectionCursor() {
  //   var text = window.getSelection()?.toString();
	// 	var range = window.getSelection()?.getRangeAt(0);
	// 	if (!range) {
	// 		return
	// 	}
  //   this.caretPos = range.startOffset;
  //   console.log(range);
  //   console.log(range.startContainer.textContent,
  //               range.startOffset,
  //               range.endOffset)
  // }
  // jumpCursor() {
  //   var range = window.getSelection()?.getRangeAt(0);
	// 	var length = document.getElementById("hello")?.textContent?.length;
	// 	if (!range) {
	// 		return
	// 	}
  //   if (range.startOffset === 10 && length === 10) {
  //     this.setCaret()
  //   }
  // }
  // setCaret() {
	// 	var element = document.getElementById("hello");
	// 	if (!element) {
	// 		return;
	// 	}
  //   var range = document.createRange();  
  //   var node;   
	// 	node = document.getElementById("hello");  
	// 	if (!node) {
	// 		return;
	// 	}
  //   range.setStart(node.childNodes[0], 3);
	// 	var sel = window.getSelection();
	// 	if (!sel) {
	// 		return
	// 	}
  //   range.collapse(true);
  //   sel.removeAllRanges();
  //   sel.addRange(range);
  //   element.focus();    
  // }

}
