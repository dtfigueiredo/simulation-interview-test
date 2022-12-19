import './App.css';

import { useState } from 'react';

interface coordsProps {
  axisX: number,
  axisY: number
}

const initialCoords = {
  axisX: 0,
  axisY: 0,
}

function App() {
  const [coords, setCoords] = useState<coordsProps[]>([])
  const [lastCoord, setLastCoord] = useState<coordsProps>(initialCoords)
  const [auxUndoTimeline, setAuxUndoTimeline] = useState<coordsProps[]>([])

  const getCoordinates = (event: React.MouseEvent<HTMLElement>) => {
    const axisX = event.clientX
    const axisY = event.clientY
    setCoords([...coords, { axisX, axisY }])
  }

  const handleUndoClick = () => {
    const lastCoord = coords.pop()
    if (!lastCoord) return
    setLastCoord({ axisX: lastCoord?.axisX, axisY: lastCoord?.axisY })

    const newTimeline = coords.filter(item => item !== lastCoord)
    setAuxUndoTimeline(newTimeline)
  }

  const handleRedoClick = () => {
    setCoords([...auxUndoTimeline, lastCoord])
  }

  console.log(coords)

  return (
    <>
      <header className='header'>
        <button className="undo" onClick={handleUndoClick}>UNDO</button>
        <button className="redo" onClick={handleRedoClick}>REDO</button>
      </header>

      <div className="App" onClick={getCoordinates}>
        {coords.map(item => (
          <div key={`${item.axisX}--${item.axisY}`} style={{ position: "absolute", top: item.axisY, left: item.axisX }} className="ball"></div>
        )
        )}
      </div>
    </>
  )
}

export default App
