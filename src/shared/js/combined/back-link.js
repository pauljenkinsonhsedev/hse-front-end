export function backLinks() {
  const breadCrumbs = document.querySelectorAll('.breadCrumbContainer ol li a');

  if (breadCrumb) {
    const lastItem = [ ...breadCrumbs ].pop();
    const linkText = lastItem.textContent;
    const linkUrl = lastItem.attributes['href'].value;
    const backnav = breadCrumb.querySelector('#backnav');

    backnav.href = linkUrl;
    backnav.textContent = linkText;
  }
}
