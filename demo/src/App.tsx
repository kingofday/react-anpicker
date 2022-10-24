import React, { useState } from 'react';
import { AnPicker } from 'react-anpicker';

function App() {
  const [date, setDate] = useState(null);
  const handleChange = (date: Date | null, locale: string | null) => { }
  return (
    <div className="App">
      <div className='fa' dir='rtl'>
        <h1>Persian</h1>
        <AnPicker defaultOpen={false} value={date} onChange={handleChange} />
      </div>
    </div>
  );
}

export default App;
