const mediaQuery = (function() {

    const _mqLarge = window.matchMedia('(min-width: 1200px)');
    // const _mqMedium = window.matchMedia('(min-width: 768px)');
    // const _mqSmall = window.matchMedia('(min-width: 576px)');
     
    // Check if the media query is true
    _mqLarge() {
      if (_mqLarge.matches) {
          return true;
      }
      // return false;
    }

    return {
        mqLarge: _mqLarge
    }
});

export default mediaQuery;