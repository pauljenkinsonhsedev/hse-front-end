export function scrollPos() {
    const pageContainer = document.getElementById('pageContainer');
    const body = document.getElementsByTagName('body')[0];
    const windowHeight = window.innerHeight;
    const pageHeight = pageContainer.clientHeight;

    if (windowHeight < pageHeight) {
        body.classList.add('feedback-in');
    }

    window.addEventListener('scroll', function(e) {
        if (this.scrollY > (windowHeight / 2)) {
            body.classList.add('feedback-in');
        }
    });

    console.log('window', window.innerHeight);
    console.log('pageContainer', pageContainer.clientHeight);
}