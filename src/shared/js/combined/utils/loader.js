export function loader(target) {
    let loader = document.createElement('div');
    loader.className = 'hse-loader';
    loader.innerHTML = '<div></div><div></div><div></div><div></div>';
    target.appendChild(loader);
}