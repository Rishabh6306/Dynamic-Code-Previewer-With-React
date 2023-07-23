// import React, { useState } from 'react';

// const CodeEditor = () => {
//   const [htmlCode, setHtmlCode] = useState('');
//   const [cssCode, setCssCode] = useState('');
//   const [jsCode, setJsCode] = useState('');

//   const handleOutput = () => {
//     const iframe = document.getElementById('output');
//     const combinedCode = `
//       <html>
//         <head>
//           <style>${cssCode}</style>
//         </head>
//         <body>${htmlCode}</body>
//         <script>${jsCode}</script>
//       </html>
//     `;

//     // Safely execute the JS code in a function scope
//     try {
//       const executeCode = new Function(jsCode);
//       executeCode();
//     } catch (error) {
//       console.error(error);
//     }

//     iframe.contentDocument.body.innerHTML = combinedCode;
//   };

//   return (
//     <div id='main-container'>
//       <div className="box">
//         <div className="heading">HTML</div>
//         <textarea
//           id="htmlFrame"
//           onChange={(e) => setHtmlCode(e.target.value)}
//         />
//       </div>

//       <div className="box">
//         <div className="heading">CSS</div>
//         <textarea
//           id="cssFrame"
//           onChange={(e) => setCssCode(e.target.value)}
//         />
//       </div>

//       <div className="box">
//         <div className="heading">JS</div>
//         <textarea
//           id="jsFrame"
//           onChange={(e) => setJsCode(e.target.value)}
//         />
//       </div>

//       <div className="box">
//         <div className="heading-and-button">
//           <div className="heading">Live Preview</div>
//           <button className="run-button" id="runButton" onClick={handleOutput} >
//             Run
//           </button>
//         </div>
//         <div className="output-container">
//           <iframe id="output" title="Live Preview" />
//         </div>

//       </div>

//     </div>
//   );
// };

// export default CodeEditor










import React, { useState, useRef } from 'react';
import { SketchPicker } from 'react-color';
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

  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);

  const handleHtmlColorChange = (color) => {
    setHtmlBgColor(color.hex);
  };

  const handleCssColorChange = (color) => {
    setCssBgColor(color.hex);
  };

  const handleJsColorChange = (color) => {
    setJsBgColor(color.hex);
  };

  const handleHtmlColorPickerClick = () => {
    setShowHtmlColorPicker(!showHtmlColorPicker);
  };

  const handleCssColorPickerClick = () => {
    setShowCssColorPicker(!showCssColorPicker);
  };

  const handleJsColorPickerClick = () => {
    setShowJsColorPicker(!showJsColorPicker);
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
      <div className="box">
        <div className="heading">
          HTML
          <BackgroundColorPicker
            bgColor={htmlBgColor}
            onColorChange={handleHtmlColorChange}
            showColorPicker={showHtmlColorPicker}
            onColorPickerClick={handleHtmlColorPickerClick}
          />
        </div>
        <textarea
          id="htmlFrame"
          onChange={(e) => setHtmlCode(e.target.value)}
          style={{ background: htmlBgColor }}
          ref={htmlRef}
        />
      </div>

      <div className="box">
        <div className="heading">
          CSS
          <BackgroundColorPicker
            bgColor={cssBgColor}
            onColorChange={handleCssColorChange}
            showColorPicker={showCssColorPicker}
            onColorPickerClick={handleCssColorPickerClick}
          />
        </div>
        <textarea
          id="cssFrame"
          onChange={(e) => setCssCode(e.target.value)}
          style={{ background: cssBgColor }}
          ref={cssRef}
        />
      </div>

      <div className="box">
        <div className="heading">
          JS
             <BackgroundColorPicker
            bgColor={jsBgColor}
            onColorChange={handleJsColorChange}
            showColorPicker={showJsColorPicker}
            onColorPickerClick={handleJsColorPickerClick}
          />
        </div>
        <textarea
          id="jsFrame"
          onChange={(e) => setJsCode(e.target.value)}
          style={{ background: jsBgColor }}
          ref={jsRef}
        />
      </div>

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
