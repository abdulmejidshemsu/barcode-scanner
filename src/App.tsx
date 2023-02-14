// @ts-check

import React, { useState } from 'react';
import './App.css';
import Html5QrcodePlugin from './Html5QrcodePlugin';

const App = () => {
  const [decodedResult, setDecodedResult] = useState('EMPTY');
  const onNewScanResult = (decodedText: React.SetStateAction<string>, decodedResult: any) => {
    console.log("App [result]", decodedResult);
    // setDecodedResult(decodedText);

  };

  return (
    <div className="App">
      <section className="App-section">
        <div className="App-section-title"> Html5-qrcode React demo</div>
        <br />
        <br />
        <br />
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        {/* decodedResult: {
          decodedResult
        } */}
      </section>
    </div>
  );
};

export default App;
