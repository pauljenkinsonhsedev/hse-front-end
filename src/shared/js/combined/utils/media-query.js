const mediaQuery = (function() {
const smallDevice = window.matchMedia("(min-width: 576px)");

// smallDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches) {
    console.log("Bigger Than Mobile");
  }
};

});

export default mediaQuery;