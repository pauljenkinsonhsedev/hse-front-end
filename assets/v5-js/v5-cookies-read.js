var cookieVal = Cookies.get('cookies_policy');

const json = cookieVal;
const obj = JSON.parse(cookieVal);

// Assigns variables to cookies values

var usageSet = (obj.usage);
var campaignsSet = (obj.campaigns);
var settingsSet = (obj.settings);	