export function mediaQuery() {
  let result;

  const small = '375';
  const medium = '800';
  const large = '980';

  const smallDeviceQuery = window.matchMedia(`(min-width: 0px)`);
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
