import React from 'react';

// This approach imports all values at build time
// Import all value files from the values directory
// The values are imported as raw strings
import CU_MUSD_HOUR from '../../values/CU_MUSD_HOUR.md';
import CU_MTFT_HOUR from '../../values/CU_MTFT_HOUR.md';
import SU_MUSD_HOUR from '../../values/SU_MUSD_HOUR.md';
import SU_MTFT_HOUR from '../../values/SU_MTFT_HOUR.md';
import NU_MUSD_HOUR from '../../values/NU_MUSD_HOUR.md';
import NU_MTFT_HOUR from '../../values/NU_MTFT_HOUR.md';
import IP_MUSD_HOUR from '../../values/IP_MUSD_HOUR.md';
import IP_MTFT_HOUR from '../../values/IP_MTFT_HOUR.md';
import NAME_MUSD_HOUR from '../../values/NAME_MUSD_HOUR.md';
import NAME_MTFT_HOUR from '../../values/NAME_MTFT_HOUR.md';
import DNAME_MUSD_HOUR from '../../values/DNAME_MUSD_HOUR.md';
import DNAME_MTFT_HOUR from '../../values/DNAME_MTFT_HOUR.md';
import TFT_VALUE from '../../values/tft_value.md';
import TFT_SUPPLY from '../../values/tft_supply.md';
import TFT_MARKETCAP from '../../values/tft_marketcap.md';

// Create a mapping of value keys to their content
const values = {
  'CU_MUSD_HOUR': CU_MUSD_HOUR.trim(),
  'CU_MTFT_HOUR': CU_MTFT_HOUR.trim(),
  'SU_MUSD_HOUR': SU_MUSD_HOUR.trim(),
  'SU_MTFT_HOUR': SU_MTFT_HOUR.trim(), 
  'NU_MUSD_HOUR': NU_MUSD_HOUR.trim(),
  'NU_MTFT_HOUR': NU_MTFT_HOUR.trim(),
  'IP_MUSD_HOUR': IP_MUSD_HOUR.trim(),
  'IP_MTFT_HOUR': IP_MTFT_HOUR.trim(),
  'NAME_MUSD_HOUR': NAME_MUSD_HOUR.trim(),
  'NAME_MTFT_HOUR': NAME_MTFT_HOUR.trim(),
  'DNAME_MUSD_HOUR': DNAME_MUSD_HOUR.trim(),
  'DNAME_MTFT_HOUR': DNAME_MTFT_HOUR.trim(),
  'tft_value': TFT_VALUE.trim(),
  'tft_supply': TFT_SUPPLY.trim(),
  'tft_marketcap': TFT_MARKETCAP.trim()
};

/**
 * Component to include values from markdown files
 * @param {Object} props - Component props
 * @param {string} props.path - Path to the value file relative to values directory
 * @returns {React.ReactElement} - React component
 */
export default function Include({ path }) {
  // Extract the file name from the path (for matching with our value keys)
  const fileName = path.split('/').pop().replace('.md', '');
  
  // Look up the value in our mapping
  const value = values[fileName] || 'Value not found';
  
  return <span>{value}</span>;
}
