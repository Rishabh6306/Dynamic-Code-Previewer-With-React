import React from 'react';
import { SketchPicker } from 'react-color';
import './BackgroundColorPicker.css'

const BackgroundColorPicker = ({ bgColor, onColorChange, showColorPicker, onColorPickerClick }) => {
  return (
    <div className="color-picker-container"> {/* Add the .color-picker-container class here */}
      <div
        className="color-picker-icon"
        onClick={onColorPickerClick}
      />
      {showColorPicker && (
        <SketchPicker color={bgColor} onChange={onColorChange} />
      )}
    </div>
  );
};

export default BackgroundColorPicker;