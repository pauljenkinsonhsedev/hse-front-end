export function backLinks() {
const elems = Array.from(document.querySelectorAll(".hse-breadcrumb ol li:not(:first-child) a"))
elems.pop()
elems.map(node => node.parentNode.remove(node))
}
