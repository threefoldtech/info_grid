// This file exports the values from values.json to be used in the app
import values from './values.json';

// In the browser, attach values to the window object for global access
if (typeof window !== 'undefined') {
  window.valueData = values;
}

export default values;
