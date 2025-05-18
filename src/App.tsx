import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'taskInputs';

function App() {
  const date = new Date();
  
  const currentDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  const [inputs, setInputs] = useState(Array(24).fill(''));

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setInputs(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  }, [inputs]);

  // @ts-ignore
  const handleInputChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  return (
    <>
      <h1>Tasks</h1>
      <h3>{currentDate}</h3>
      <div id="tasks">
        {
          inputs.map((el, i) => (
            <div className="task" key={i}>
              <h2>{(i < 10 ? "0" + i : i) + ":00"}</h2>
              <input type="text" placeholder="What needs to be done?" onInput={(e) => handleInputChange(i, (e.target as HTMLInputElement).value)} value={el} />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
