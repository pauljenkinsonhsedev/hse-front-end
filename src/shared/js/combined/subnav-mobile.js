
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
	mobileButton.setAttribute('aria-pressed', currentState === 'false')

	if (currentState === 'false') {
		buttonText.innerHTML = 'Close menu';
		mobileButton.setAttribute('aria-expanded', true);
		listItem.forEach((item) => {
			item.querySelector('a').tabIndex = 0;
		});

	} else {
		buttonText.innerHTML = 'Open menu';
		mobileButton.setAttribute('aria-expanded', false);
        listItem.forEach((item) => {
			item.querySelector('a').tabIndex = -1;
		});

	}
  }
  
  mobileButton.addEventListener('click', toggleIsOpen)

};

