export function scrollPos() {
    const body = document.getElementsByTagName('body')[0];

    function yScroll(){
        let yPos = window.pageYOffset;
        if(yPos > 70){
            body.classList.add('feedback-in');
        }
    }
    window.addEventListener('scroll', yScroll);
}