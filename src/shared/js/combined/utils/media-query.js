export function mediaQuery() {
  let result;

  const small = '320';
  const medium = '641';
  const large = '769';

  // match sass-mq breakpoints
  // const mobile = '320';
  // const tablet = '641';
  // const desktop = '769';
  // const largeDesktop = '990';

  const smallDeviceQuery = window.matchMedia(`(min-width: ${small}px)`);
  const mediumDeviceQuery = window.matchMedia(`(min-width: ${medium}px)`);
  const largeDeviceQuery = window.matchMedia(`(min-width: ${large}px)`);

  smallDeviceQuery.addListener(smallDeviceChange);
  mediumDeviceQuery.addListener(mediumDeviceChange);
  largeDeviceQuery.addListener(largeDeviceChange);

  // initiate
  smallDeviceChange(smallDeviceQuery);
  mediumDeviceChange(mediumDeviceQuery);
  largeDeviceChange(largeDeviceQuery);

  function smallDeviceChange(e) {
    if (e.matches) {
      result = 'small';
    }
  }

  function mediumDeviceChange(e) {
    if (e.matches) {
      result = 'medium';
    }
  }

  function largeDeviceChange(e) {
    if (e.matches) {
      result = 'large';
    }
  }

  return result;
}
