import { mediaQuery } from './utils/media-query.js';
import resizer from './utils/resizer.js';


export function subNavMobile() {

const mobileButton = document.querySelector('.btn-mobile');
const secondaryMenu = document.querySelector('#menu');

const listItem = document.querySelector('.subnav-wrapper');
const listItems = listItem.querySelectorAll('li');

// Watch for resizing and toggle aria-expanded
function posSwitch(){
	const mediaquery = mediaQuery();
	console.log('a change');
	if (mediaquery > 'large') {
		mobileButton.setAttribute('aria-expanded', false);
		console.log('mobile');

	} else {
		mobileButton.setAttribute('aria-expanded', true);
		console.log('desktop');
	}
}
posSwitch();
// watch for window resize
resizer(posSwitch);


const stateBeforeClick = mobileButton.getAttribute('aria-pressed');
console.log('state before click' + stateBeforeClick);
// Set tab-index to -1 before click event (menu closed)
if (stateBeforeClick === 'false') {

	listItems.forEach((item) => {

		const tabIndex = item.querySelector('a').tabIndex;

		if (tabIndex === 0 ) {
			item.querySelector('a').tabIndex = -1;
			item.classList.add("tab-index-0-page-load");

		} else if (tabIndex === -1 ) {
			item.querySelector('a').tabIndex = -1;	
			item.classList.add("tab-index-1-page-load");

		}

	});

// Reset tab-index on first button click
function onClick(event){
	mobileButton.removeEventListener('click', onClick);
	listItems.forEach((item) => {

		if (item.classList.contains('tab-index-0-page-load')) {
			item.querySelector('a').tabIndex = 0;
		}

		if (item.classList.contains('tab-index-1-page-load')) {
			item.querySelector('a').tabIndex = -1;
		}
	});
 }
 
 mobileButton.addEventListener('click', onClick);
}


 const buttonText = document.querySelector('.menu-mobile-text');
 const svgPath = document.querySelector('#menu-mobile-path');

 // Visually hide menu title
 const menuTitle = document.querySelector('li.first').innerText;
 buttonText.innerHTML = 'Open ' + '<span class="visually-hidden">' + menuTitle + '</span>' + ' menu';




// Set attributes toggle
function toggleIsOpen() {

	// Get menu state
	const currentState = mobileButton.getAttribute('aria-pressed');

	// Tab indexing
	const listItem = document.querySelector('.subnav-wrapper');
    const listItems = listItem.querySelectorAll('li');
    
	// Set state to closed
	mobileButton.setAttribute('aria-pressed', currentState === 'false');

	if (currentState === 'false') {

		// SHOW MENU
		mobileButton.setAttribute('aria-expanded', true);
		secondaryMenu.classList.add('show');

		// SVG attributes
		svgPath.setAttribute('d', 'M18 7L7 18M7 7L18 18'); 
		svgPath.setAttribute('stroke', 'white'); 
        svgPath.setAttribute('stroke-width', '1.2'); 

		// Button text

		buttonText.innerHTML = 'Close ' + '<span class="visually-hidden">' + menuTitle + '</span>' + ' menu';

		//  Open tab-index fix

		listItems.forEach((item) => {

			if (item.classList.contains('close-state-0')) {
				item.querySelector('a').tabIndex = 0;
			}
	
			if (item.classList.contains('close-state-1')) {
				item.querySelector('a').tabIndex = -1;
			}
		});


	} else {

		// HIDE MENU
		secondaryMenu.classList.remove('show');
		mobileButton.setAttribute('aria-expanded', false);

		// SVG attributes
		svgPath.setAttribute('d', 'M6 8.1H19V6.9H6V8.1ZM6 18.1H19V16.9H6V18.1ZM6 13.1H19V11.9H6V13.1Z');
		svgPath.removeAttribute('stroke', 'white'); 
        svgPath.removeAttribute('stroke-width', '1.2'); 

		// Button text

		buttonText.innerHTML = 'Open ' + '<span class="visually-hidden">' + menuTitle + '</span>' + ' menu';

		// Close tab-index fix

		listItems.forEach((item) => {

			const tabIndex = item.querySelector('a').tabIndex;
	
			if (tabIndex === 0 ) {
				item.querySelector('a').tabIndex = -1;
				item.classList.add("close-state-0");
				item.classList.remove("close-state-1");

	
			} else if (tabIndex === -1 ) {
				item.querySelector('a').tabIndex = -1;	
				item.classList.add("close-state-1");
				item.classList.remove("close-state-0");

	
			}
	
		});


	}
  }
  
  mobileButton.addEventListener('click', toggleIsOpen)
};
