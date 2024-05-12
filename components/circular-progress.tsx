import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CPProps{
    value: number
}

// e4e5e7
function CircularProgress({value}: CPProps) {
  return (
    <div className="w-[27px] h-[25px]">
        <CircularProgressbar 
            value={value} 
            styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                textColor: '#1dbf73',
                trailColor: '#e4e5e7',
                pathColor:'#1dbf73'
              })}
            strokeWidth={7}
            
        />
    </div>
  )
}

export default CircularProgress;