import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Context } from '../../../context/Context';
import styled from './MaxMinSlider.module.css';

function valuetext(value) {
  return `${value}₺`;
}

const minDistance = 100;

export default function MaxMinSlider() {
    const { priceRange, setPriceRange } = useContext(Context);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <div className={styled['slider-label']}>
        <label  htmlFor='price'>
          Fiyat Aralığını seç
        </label>
      </div>

      <div className={styled['max-min']}>
        <span>0₺</span>
        <span>5000₺</span>
      </div>
      <Slider
        id='price'
        name='price'
        getAriaLabel={() => 'Minimum distance'}
        value={priceRange}
        onChange={handleChange1}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
        min={0}
        max={5000}
        disableSwap
      />
    </Box>
  );
}
