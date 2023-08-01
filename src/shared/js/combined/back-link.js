export function backLinks() {
    const breadCrumbs = document.querySelectorAll('.hse-breadcrumb ol li a');
    const breadCrumbsContainer = document.querySelector('.hse-breadcrumb__container');

    if (breadCrumb) {
      const lastItem = [ ...breadCrumbs ].pop();
      const linkText = lastItem.textContent;
      const linkUrl = lastItem.attributes['href'].value;

      let breadcrumbBack = document.createElement("p");
      let breadcrumbBackLink = document.createElement('a');
      breadcrumbBack.appendChild(breadcrumbBackLink);

      breadcrumbBack.className = 'hse-breadcrumb__back';
      breadcrumbBackLink.className = 'hse-breadcrumb__backlink';

      breadcrumbBackLink.textContent = linkText;
      breadcrumbBackLink.href = linkUrl;
      breadCrumbsContainer.appendChild(breadcrumbBack);
  

    }
    
}


