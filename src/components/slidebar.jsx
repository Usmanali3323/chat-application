import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SlidebarChat from './slidebarChat'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import '../css/slidebar.css';
import { collection, getDocs,addDoc } from "firebase/firestore"; 
import db from '../firebase/config';
import { Add } from '@mui/icons-material';
import { useStateValue } from './stateProvider';

function slidebar() {
  const [rooms , setRooms] = useState([]);
  const [add , setAdd] = useState(true);
  const [{user},dispatch] = useStateValue();
  const createRoom = async() =>{
    const room = prompt("Please Enter Room Name");
    if(room){
    try{ 
       const docref = await addDoc(collection(db,'rooms'),{
        name:room
       });   
       setAdd(!add);   
    } catch(err){
      console.log("Error occur during add Room  "+err);
    }
  }
  }
  
  
  
  useEffect(()=>{
   async function fetch(){
  try{
   const querysnapshot  = await getDocs(collection(db,'rooms'));
   const arr = [];
   querysnapshot.forEach((doc)=>{
     arr.push({
      id : doc.id,
      data: doc.data()
     }); 
    })
    setRooms([...arr]);
  } catch(err){
    console.log("Error occuring during get Data "+err);
  }
   }
  fetch();
  return;
  },[add]);


  return (
    <div className='slidebar'>
     <div className='slidebar__header'>
       <Avatar src={user.photoURL}/>
       <div className='slidebar__headerRight'>
       <IconButton>
       <DonutLargeIcon/>
       </IconButton>

       <IconButton>
        <ChatIcon/>
       </IconButton>

       <IconButton>
        <MoreVertIcon/>
       </IconButton>
       </div>
       </div>

       <div className='slidebar__search'>
        <div className='slidebar__searchContainer'>
        <SearchIcon/>
        <input type='text' placeholder='Search or Start a new Chat'/>
       </div>       
     </div>


     <div className='slidebar__chats'>
     <SlidebarChat addnewchat createRoom={createRoom}/>
     {
      rooms.map(room=>{
       return (
         <SlidebarChat key={room.id} id={room.id} data={room.data.name}/>
       )
      })
     }
     
     </div>
    </div>
  )
}

export default slidebar;