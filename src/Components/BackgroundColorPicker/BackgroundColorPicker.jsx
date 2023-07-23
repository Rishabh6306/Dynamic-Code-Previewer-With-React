import React from 'react';
import { SketchPicker } from 'react-color';

const BackgroundColorPicker = ({ bgColor, onColorChange, showColorPicker, onColorPickerClick }) => {
  return (
    <div>
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