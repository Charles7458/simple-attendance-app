import { useState, useEffect } from 'react'

import './App.css'

function Student(student : { name: string, id : number, setAttendance : (id: number,isPresent:boolean) => void}) {
function handleCheck(checked:boolean) {
    student.setAttendance(student.id,checked);
    console.log(student.id, checked)
}
  return (
    <div>
      <input type="checkbox" onChange={e => handleCheck(e.target.checked)} />
      <span>{student.name}</span>
    </div>
  );
}

function App() {
  const students = ["Charles", "Ammaar", "Poovarasan","Goushik","Mukilvannan", "Sameer", "Raghav", "Nithish", "Krishna", "Paari", 
    "Selvakumar","Arun", "Kaarmukil","Rawther"]
  const [attendance,setAttendance] = useState(Array(students.length).fill(0));
  console.log(attendance)
  const [total,setTotal] = useState(0);
  function handleAttendance(id:number,isPresent:boolean){
    const newAttendance = attendance;
    if(isPresent){
      newAttendance[id] = 1;
    }
    else{
      newAttendance[id] = 0;
    }
    setAttendance(newAttendance)
    setTotal(n=>attendance.reduce((accumulator:number,curr:number)=>accumulator+curr,0))
    console.log(total)
  }

  return (
    <div>
      <h1 className='head'>MCA Boys Attendance</h1>
      <p>{total == attendance.length ? "All" : total} boys are present today...</p>
      {students.map((student,i) => <Student name={student} id={i} setAttendance={handleAttendance} />)}
    </div>
  )
}

export default App
