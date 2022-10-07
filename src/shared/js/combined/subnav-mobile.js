
export function subNavMobile() {

// Handler that uses various data-* attributes to trigger
// specific actions, mimicing bootstraps attributes

// Grab all the trigger elements on the page
const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));
	

	
	
	
// Listen for click events, but only on our triggers
window.addEventListener('click', (evnt) => {
	
  const elm = evnt.target;
  if (triggers.includes(elm)) {
	  

	  
	  
    const selector = elm.getAttribute('data-target');	 
	  
    collapse(selector, 'toggle');
  }
}, false);

// map our commands to the classList methods
const fnmap = {
  'toggle': 'toggle',	// toggle
  'show': 'add',		// add
  'hide': 'remove'		// remove

};

function collapse(selector, command) {
	
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach(target => {
    target.classList[fnmap[command]]('show');	// show
	console.table(target.classList);
  });
	
	
	
}

// Mobile menu toggle

const mobileButton = document.querySelector('.btn-mobile');
// const mobileSVG = document.querySelector("[data-menu-icon=menu]");

const mobileButtonState = mobileButton.getAttribute('aria-pressed');
const listItem = document.querySelectorAll('.subnav-wrapper li');

// Set tab-index to -1 before click event (menu closed)
if (mobileButtonState === 'false') {
	listItem.forEach((item) => {
		item.querySelector('a').tabIndex = -1;
	});
}

// Set attributes toggle
function toggleIsOpen() {
	const currentState = mobileButton.getAttribute('aria-pressed');
	const buttonText = document.querySelector('.menu-mobile-text');
	mobileButton.setAttribute('aria-pressed', currentState === 'false');
	const svgPath = document.querySelector('#menu-mobile-path');

	if (currentState === 'false') {
		buttonText.innerHTML = 'Close menu';
		mobileButton.setAttribute('aria-expanded', true);
		// SVG attributes
		svgPath.setAttribute('d', 'M18 7L7 18M7 7L18 18'); 
		svgPath.setAttribute('stroke', 'white'); 
        svgPath.setAttribute('stroke-width', '1.2'); 
		listItem.forEach((item) => {
			item.querySelector('a').tabIndex = 0;
			
		});

	} else {
		buttonText.innerHTML = 'Open menu';
		mobileButton.setAttribute('aria-expanded', false);
		// SVG attributes
		svgPath.setAttribute('d', 'M6 8.1H19V6.9H6V8.1ZM6 18.1H19V16.9H6V18.1ZM6 13.1H19V11.9H6V13.1Z');
		svgPath.removeAttribute('stroke', 'white'); 
        svgPath.removeAttribute('stroke-width', '1.2'); 
        listItem.forEach((item) => {
			item.querySelector('a').tabIndex = -1;
		});

	}
  }
  
  mobileButton.addEventListener('click', toggleIsOpen)

};

