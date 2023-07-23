import React, { useState, useRef } from 'react';
// import { SketchPicker } from 'react-color';
import './CodeEditor.css'
import BackgroundColorPicker from '../BackgroundColorPicker/BackgroundColorPicker';

const CodeEditor = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [htmlBgColor, setHtmlBgColor] = useState('#524e4e');
  const [cssBgColor, setCssBgColor] = useState('#524e4e');
  const [jsBgColor, setJsBgColor] = useState('#524e4e');
  const [showHtmlColorPicker, setShowHtmlColorPicker] = useState(false);
  const [showCssColorPicker, setShowCssColorPicker] = useState(false);
  const [showJsColorPicker, setShowJsColorPicker] = useState(false);

  const htmlRef = useRef();
  const cssRef = useRef();
  const jsRef = useRef();

  const handleColorChange = (type, color) => {
    switch (type) {
      case 'html':
        setHtmlBgColor(color.hex);
        break;
      case 'css':
        setCssBgColor(color.hex);
        break;
      case 'js':
        setJsBgColor(color.hex);
        break;
      default:
        break;
    }
  };

  const handleColorPickerClick = (type) => {
    switch (type) {
      case 'html':
        setShowHtmlColorPicker(!showHtmlColorPicker);
        break;
      case 'css':
        setShowCssColorPicker(!showCssColorPicker);
        break;
      case 'js':
        setShowJsColorPicker(!showJsColorPicker);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    const iframe = document.getElementById('output');
    const combinedCode = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
        <script>${jsCode}</script>
      </html>
    `;

    try {
      const executeCode = new Function(jsCode);
      executeCode();
    } catch (error) {
      console.error(error);
    }

    iframe.contentDocument.body.innerHTML = combinedCode;
  };

  const handleClearClick = () => {
    const iframe = document.getElementById('output');
    iframe.contentDocument.body.innerHTML = '';
  };

  return (
    <div id='main-container'>
      {['html', 'css', 'js'].map((type) => (
        <div className="box" key={type}>
          <div className="heading">
            {type.toUpperCase()}
          <BackgroundColorPicker
              bgColor={type === 'html' ? htmlBgColor : type === 'css' ? cssBgColor : jsBgColor}
              onColorChange={(color) => handleColorChange(type, color)}
              showColorPicker={
                type === 'html' ? showHtmlColorPicker : type === 'css' ? showCssColorPicker : showJsColorPicker
              }
              onColorPickerClick={() => handleColorPickerClick(type)}
            />
            
          </div>
          <textarea
            id={`${type}Frame`}
            onChange={(e) => {
              switch (type) {
                case 'html':
                  setHtmlCode(e.target.value);
                  break;
                case 'css':
                  setCssCode(e.target.value);
                  break;
                case 'js':
                  setJsCode(e.target.value);
                  break;
                default:
                  break;
              }
            }}
            style={{ background: type === 'html' ? htmlBgColor : type === 'css' ? cssBgColor : jsBgColor }}
            ref={type === 'html' ? htmlRef : type === 'css' ? cssRef : jsRef}
          />
        </div>
      ))}

      <div className="box">
        <div className="heading-and-button">
          <div className="heading">Live Preview</div>
          <div id="buttons">
            <button className="btn" id="runButton" onClick={handleOutput}>
              Run
            </button>
            <button className="btn" onClick={handleClearClick}>
              Clear
            </button>
          </div>
        </div>
        <div className="output-container">
          <iframe id="output" title="Live Preview" />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;