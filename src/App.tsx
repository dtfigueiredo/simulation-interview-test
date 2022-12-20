import './App.css';

import { useState } from 'react';

interface coordsProps {
  axisX: number,
  axisY: number
}

function App() {
  const [coords, setCoords] = useState<coordsProps[]>([])
  const [lastCoords, setLastCoords] = useState<coordsProps[]>([])

  const getCoordinates = (event: React.MouseEvent<HTMLElement>) => {
    const axisX = event.clientX
    const axisY = event.clientY
    setCoords([...coords, { axisX, axisY }])
  }

  const handleUndoClick = () => {
    const lastCoord = coords.pop()
    if (!lastCoord) return
    setLastCoords([...lastCoords, { axisX: lastCoord.axisX, axisY: lastCoord.axisY }])

    const newTimeline = coords.filter(item => item !== lastCoord)
    setCoords(newTimeline)
  }

  const handleRedoClick = () => {
    if (lastCoords.length === 0) return
    setCoords([...coords, lastCoords[lastCoords.length - 1]])
    lastCoords.pop()
  }

  return (
    <>
      <header className='header'>
        <button className="undo" onClick={handleUndoClick} disabled={coords.length === 0}>UNDO</button>
        <button className="redo" onClick={handleRedoClick} disabled={lastCoords.length === 0}>REDO</button>
      </header>

      <div className="App" onClick={getCoordinates}>
        {coords.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: item.axisY,
              left: item.axisX,
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              backgroundColor: '#eafcc2',
            }}
            className="ball"></div>
        )
        )}
      </div>
    </>
  )
}

export default App
