const load = (function() {
  function _load(tag) {
    return function(url) {
      return new Promise(function(resolve, reject) {
        let element = document.createElement(tag);

        if (tag === 'scriptAsync') {
          element = document.createElement('script');
        } else if (tag === 'scriptHead') {
          element = document.createElement('script');
        } else {
          element = document.createElement(tag);
        }

        let parent = 'body';
        let attr = 'src';

        element.onload = function() {
          resolve(url);
        };
        element.onerror = function() {
          reject(url);
        };

        // Set different attributes depending on tag type
        switch(tag) {
          case 'script':
            element.async = false;
            break;
          case 'scriptHead':
            element.async = true;
            parent = 'head';
            break;
          case 'scriptAsync':
            element.async = true;
            break;
          case 'link':
            element.type = 'text/css';
            element.rel = 'stylesheet';
            attr = 'href';
            parent = 'head';
        }

        // Inject into document for loading
        element[attr] = url;
        document[parent].appendChild(element);
      });
    };
  }

  return {
    css: _load('link'),
    js: _load('script'),
    jsHead: _load('scriptHead'),
    jsAsync: _load('scriptAsync'),
    img: _load('img')
  }
})();

export default load;