const loading = (function(target) {
    let loader = document.createElement('div');
    loader.className = 'hse-loader';
    loader.innerHTML = '<div></div><div></div><div></div><div></div>';

    function _start() {
        target.appendChild(loader);
    }

    function _finish() {
        target.remove(loader);
    }

    return {
        start: _start(),
        finish: _finish()
    }
});

export default loading;