import { useState } from 'react'

import './App.css'

function Student(student : { name: string, id : number, attendance:boolean, setAttendance : (id: number,isPresent:boolean) => void}) {
function handleCheck(checked:boolean) {
    student.setAttendance(student.id,checked);
    console.log(student.id, checked)
}
  return (
    <div>
      <input type="checkbox" checked={student.attendance} onChange={e => handleCheck(e.target.checked)} />
      <span>{student.name}</span>
    </div>
  );
}

function App() {
  const students = ["Charles", "Ammaar", "Poovarasan","Goushik","Mukilvannan", "Sameer", "Raghav", "Nithish", "Krishna", "Paari", 
    "Selvakumar","Arun", "Kaarmukil","Rawther"]
  const [attendance,setAttendance] = useState(Array(students.length).fill(false));
  console.log(attendance)
  const [total,setTotal] = useState(0);

  function handleAttendance(id:number,isPresent:boolean){
    const newAttendance = attendance;
    if(isPresent){
      newAttendance[id] = true;
    }
    else{
      newAttendance[id] = false;
    }
    setAttendance(newAttendance)
    let count = 0;
    attendance.forEach(present=>{if(present){count++}})
    setTotal(count)
    console.log(total)
  }

  function clear() {
    setAttendance(Array(students.length).fill(false))
  }

  return (
    <div>
      <h1 className='head'>MCA Boys Attendance</h1>
      <div style={{display:"flex", alignItems:'center'}}>
        <p>{total == attendance.length ? "All" : total} boys are present today...</p>
        <button onClick={clear} className='clear-btn'>Clear</button>
      </div>
      {students.map((student,i) => <Student name={student} id={i} setAttendance={handleAttendance} attendance={attendance[i]} />)}
    </div>
  )
}

export default App
