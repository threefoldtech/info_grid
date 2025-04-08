// This script is inserted in the page head to load values globally
(function() {
  // Default fallback values in case the JSON file fails to load
  window.valueData = {
    "CU_MUSD_HOUR": "30.56",
    "CU_MTFT_HOUR": "18.34",
    "SU_MUSD_HOUR": "19.44",
    "SU_MTFT_HOUR": "11.67",
    "NU_MUSD_HOUR": "10417.00",
    "NU_MTFT_HOUR": "6250.00",
    "IP_MUSD_HOUR": "6.94",
    "IP_MTFT_HOUR": "4.17",
    "NAME_MUSD_HOUR": "6.94",
    "NAME_MTFT_HOUR": "4.17",
    "DNAME_MUSD_HOUR": "13.89",
    "DNAME_MTFT_HOUR": "8.33",
    "tft_value": "0.06",
    "tft_supply": "1,000,000,000",
    "tft_marketcap": "60,000,000"
  };

  // Try to load the values.json file (will be done at build time)
  fetch('/data/values.json')
    .then(response => response.json())
    .then(data => {
      // Override the default values with the loaded ones
      window.valueData = data;
      console.log('Values loaded successfully:', Object.keys(data).length);
    })
    .catch(error => {
      console.warn('Failed to load values.json, using fallback values:', error);
    });
})();
