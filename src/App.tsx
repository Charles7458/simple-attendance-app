import { useEffect, useState } from 'react'

import './App.css'



function EditInput(fn:{name:string, change:(name:string)=>void, save:()=>void, cancel:()=>void}){
  return(
    <div style={{display:'flex',columnGap:'10px',marginBlock:'10px'}}>
      <input type='text' value={fn.name} onChange={e=>fn.change(e.target.value)}/>
      <button onClick={fn.save}>save</button>
      <button onClick={fn.cancel}>cancel</button>
    </div>
  )
}

function DeleteInput(fn:{name:string, change:(name:string)=>void,type:string, delete:(type:string)=>void, close:()=>void}){
  return(
    <div style={{display:'flex',columnGap:'10px',marginBlock:'10px'}}>
      <input type='text' value={fn.name} onChange={e=>fn.change(e.target.value)}/>
      <button onClick={()=>fn.delete(fn.type)}>delete</button>
      <button onClick={fn.close}>close</button>
    </div>
  )
}

function Student(st : 
  { name: string, 
    id : number, 
    attendance:boolean, 
    setAttendance : (id: number,isPresent:boolean) => void
  }) {


  function handleCheck(checked:boolean) {
      st.setAttendance(st.id,checked);
      console.log(st.id, checked)
  }


    return (
      <div>
        <input type="checkbox" checked={st.attendance} onChange={e => handleCheck(e.target.checked)} />
        <span style={{marginInlineStart:"20px"}}>{st.name}</span>
      </div>
    )
}

function App() {
  const [boys,setBoys] = useState<string[]>(() => {
  try {
    const stored = localStorage.getItem("boys");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
});
  
  
   const [girls,setGirls] = useState<string[]>(() => {
  try {
    const stored = localStorage.getItem("girls");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
});
  
  const [boysAttendance,setBoysAttendance] =     useState<boolean[]>(() => {
  try {
    const stored = localStorage.getItem("boysAttendance");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return Array(boys.length).fill(false);
  }
});

  const [girlsAttendance,setGirlsAttendance] = 
  useState<boolean[]>(() => {
  try {
    const stored = localStorage.getItem("girlsAttendance");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return Array(girls.length).fill(false);
  }
});

  // console.log(attendance)
  const [boysTotal,setBoysTotal] = useState(0);
  const [girlsTotal, setGirlsTotal] = useState(0);
  const total= boysTotal+ girlsTotal;
  const [editingBoys, setEditingBoys]  = useState(false);
  const [deletingBoys, setDeletingBoys]  = useState(false);
  const [deletingGirls, setDeletingGirls]  = useState(false);
  const [editingGirls, setEditingGirls]  = useState(false);
  const [newName,setNewName] = useState("")
  const [deleteName,setDeleteName] = useState("")

  function handleBoysAttendance(id:number,isPresent:boolean){
    console.log("handling boys")
    let newAttendance = boysAttendance;
    if(isPresent){
      newAttendance[id] = true;
    }
    else{
      newAttendance[id] = false;
    }
    setBoysAttendance(newAttendance)
    localStorage.setItem("boysAttendance", JSON.stringify(boysAttendance))
    console.log(boysAttendance)
    let count = 0;
    boysAttendance.forEach(present=>{if(present){count++}})
    setBoysTotal(count)
  }

  function handleGirlsAttendance(id:number,isPresent:boolean){
    console.log("handling girls")
    let newAttendance = girlsAttendance;
    if(isPresent){
      newAttendance[id] = true;
    }
    else{
      newAttendance[id] = false;
    }
    setGirlsAttendance(newAttendance)
    localStorage.setItem("girlsAttendance", JSON.stringify(girlsAttendance))
    let count = 0;
    girlsAttendance.forEach(present=>{if(present){count++}})
    setGirlsTotal(count)
  }

  function handleSave(){
    if(editingBoys){
      const newList = [...boys,newName]
      setBoys(newList)
      setEditingBoys(false)
      setNewName("")
    }
    else if(editingGirls){
      const newList = [...girls,newName]
      setGirls(newList)
      setEditingGirls(false)
      setNewName("")
    }
  }

  function handleDelete(type:string){
    if(type=="boys"){
      const newList = boys.filter((boy)=>boy!=deleteName)
      setBoys(newList)
      setEditingBoys(false)
      setDeleteName("")
    }
    else if(type=="girls"){
      const newList = girls.filter((girl)=>girl!=deleteName)
      setGirls(newList)
      setEditingGirls(false)
      setDeleteName("")
    }
  }

  function clear() {
    setBoysAttendance(Array(boys.length).fill(false))
    setGirlsAttendance(Array(girls.length).fill(false))
    setBoysTotal(0);setGirlsTotal(0);
  }

  useEffect(()=>{
    setBoysAttendance([...boysAttendance,false])
    localStorage.setItem("boys", JSON.stringify(boys))
    console.log("new boys list saved")
  },[boys])


   useEffect(()=>{
    setGirlsAttendance([...girlsAttendance,false])
    localStorage.setItem("girls", JSON.stringify(girls))
    console.log("new girls list saved")
  },[girls])


  return (
    <div>
      <h1 className='head'>MCA Attendance</h1>
      <h4 style={{textAlign:'center'}}>Total: {total} students present out of {boys.length+girls.length}</h4>
      <button onClick={clear} className='clear-btn'>Clear All</button>
      <div className='attendance-grid'>
        <div>
          <div style={{display:"flex", alignItems:'center'}}>
            <p>{boysTotal == boysAttendance.length ? "All" : boysTotal} boys are present today out of {boysAttendance.length}</p>
          </div>
         <span> Boys:{" "}
         {deletingBoys ? <DeleteInput name={deleteName} change={setDeleteName} type='boys' delete={handleDelete} close={()=>setDeletingBoys(false)}/> :
         <button style={{marginBottom:'10px'}} onClick={()=>setDeletingBoys(true)}>delete</button>}
         </span>
          {boys.map((student,i) => <Student name={student} id={i} setAttendance={handleBoysAttendance} attendance={boysAttendance[i]} />)}
          
        {editingBoys ? <EditInput name={newName} change={setNewName} save={handleSave} cancel={()=>setEditingBoys(false)}/> :

            <button className='add-btn' onClick={()=>setEditingBoys(!editingBoys)}>+</button>
        }
        </div>
        
        <div>

          <div style={{display:"flex", alignItems:'center'}}>
            <p>{girlsTotal == girlsAttendance.length ? "All" : girlsTotal} girls are present today out of {girlsAttendance.length}</p>
          </div>
          <span>Girls: {" "}
            { deletingGirls ?  <DeleteInput name={deleteName} change={setDeleteName} type='girls' delete={handleDelete} close={()=>setDeletingGirls(false)}/>:
            <button style={{marginBottom:'10px'}} onClick={()=>setDeletingGirls(true)}>delete</button>
          }
          </span>
          
          {girls.map((student,i) => <Student name={student} id={i} setAttendance={handleGirlsAttendance} attendance={girlsAttendance[i]} />)}
          
          {editingGirls ? <EditInput name={newName} change={setNewName} save={handleSave} cancel={()=>setEditingGirls(false)}/> : 
          
          <button className='add-btn' onClick={()=>setEditingGirls(!editingGirls)}>+</button>}
        </div>
      </div>
      
    </div>
  )
}

export default App
