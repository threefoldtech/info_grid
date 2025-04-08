import React from 'react';

// Instead of trying to dynamically load from markdown files directly (which causes webpack issues),
// we'll use a static JSON object with values that gets updated by the build script

// This is a hard-coded fallback in case the values are not properly loaded
// The real values should be populated by your scripts before build
const defaultValues = {
  // Cloud Unit Values
  "CU_MUSD_HOUR": "30.56",
  "CU_MTFT_HOUR": "18.34",
  "SU_MUSD_HOUR": "19.44",
  "SU_MTFT_HOUR": "11.67",
  "NU_MUSD_HOUR": "10417.00", 
  "NU_MTFT_HOUR": "6250.00",
  
  // Network Addressing Values
  "IP_MUSD_HOUR": "6.94",
  "IP_MTFT_HOUR": "4.17",
  "NAME_MUSD_HOUR": "6.94",
  "NAME_MTFT_HOUR": "4.17",
  "DNAME_MUSD_HOUR": "13.89",
  "DNAME_MTFT_HOUR": "8.33",
  
  // TFT Values
  "tft_value": "0.06",
  "tft_supply": "1,000,000,000",
  "tft_marketcap": "60,000,000"
};

// Try to load the dynamically generated values.json file
// which should be created by the scripts
let values = {};
try {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.valueData) {
    values = window.valueData; // Use globally injected values
  } else {
    // In SSR or if window.valueData is not available, use defaults
    values = defaultValues;
  }
} catch (e) {
  console.error('Error loading values:', e);
  values = defaultValues;
}

/**
 * Component to include values from the central values object
 * @param {Object} props - Component props
 * @param {string} props.path - Path to the value file (without extension)
 * @returns {React.ReactElement} - React component
 */
export default function Include({ path }) {
  try {
    // Normalize the path to match our values object keys
    // Remove .md extension if present and extract just the filename without path
    const fileName = path.replace(/\.md$/, '').split('/').pop();
    
    // Debug information in development only
    if (process.env.NODE_ENV === 'development') {
      console.log(`Include component looking for value: ${fileName}`);
    }
    
    // Look up the value in our values object
    if (values[fileName] !== undefined) {
      return <span>{values[fileName]}</span>;
    } else {
      // In development, provide more information about missing values
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Value not found: ${fileName}`);
      }
      return <span className="missing-value">{fileName}</span>;
    }
  } catch (error) {
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error in Include component for path ${path}:`, error);
    }
    return <span className="error">{path}</span>;
  }
}
