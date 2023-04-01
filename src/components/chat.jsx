import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Room } from '@mui/icons-material';
import {addDoc,collection,query,doc, getDoc ,getFirestore,serverTimestamp, setDoc, collectionGroup , onSnapshot, orderBy} from "firebase/firestore";
import db from '../firebase/config';
import '../css/chat.css';
import { Link, useParams } from 'react-router-dom';
import { async } from '@firebase/util';
import { useStateValue } from './stateProvider';
import whatsapp from '../asset/whatsapp.png';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';


function chat() {
   const {roomId} = useParams();
   const [RoomName ,setRoomName]  = useState("");
   const [input,setInput] = useState("");
   const [message, setMessage]  = useState([]);
   const [{user},dispatch]= useStateValue();
   const [idExist , setIdExist] = useState(false);
   const [display,setDisplay] = useState({display:'none'});

   useEffect(()=>{

      if(roomId){
     async function getData(){
      const docRef = doc(db, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
         setIdExist(true)
         setRoomName(docSnap.data().name);
       } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
         setIdExist(false)
       }
      
       const snapRef2 =query(collection(db, "rooms/" + roomId+ "/message"),orderBy('timestamp'));
       onSnapshot(snapRef2,(snapshot) => {
         setMessage(snapshot.docs.map((doc) => {return doc.data()}));
       })
      return;
      }
     getData();

    
   

   }
   },[roomId]);


  const sendMessage= (e)=>{
   e.preventDefault();
   if(input!= ''){
  async function get(){

   const subCol =  doc(db, "rooms", roomId);
   await addDoc(collection(subCol,"message"),{
      name: user.displayName,
      message : input,
      timestamp: serverTimestamp()
   });
    setInput("");
   }
   get();
}
  }

const signOutset = () =>{
   setDisplay({display:'flex'});
   setTimeout(()=> setDisplay({display:'none'}),5000)
} 

const signOutFirebase = () =>{
   signOut(auth).then((res) => {
     alert("Successfully Sigout");
   }).catch((error) => {
     console.log(" An error happened "+error);
   });
}

  return (
   <>
   {idExist ?
    <div className='chat'>
    <div className='chat__header'>
    {window.innerWidth < 800 ?
    <Link  to={'/'}><ArrowBackIcon/></Link> : <></>
    }
     <Avatar src={`https://api.dicebear.com/api/human/123.svg`}/>
     <div className='chat__headerInfo'> 
      <h2>{RoomName}</h2>
      <p>{new Date(message[message.length-1]?.timestamp?.seconds*1000).toLocaleString()}</p>
     </div>
     <div className='chat__headerRight'>
     <IconButton>
        <SearchIcon/>
     </IconButton>

     <IconButton >
        <AttachFileIcon/>
     </IconButton>

     <IconButton onClick={signOutset}>
        <MoreVertIcon/>
        <div className='chat__signout' onClick={signOutFirebase}>
        <p className='chat__sigoutdev' style={{fontSize: '0.8rem',display:display.display}}>signout</p>
        </div>
     </IconButton>
     </div>
    </div>

 <div className='chat__body'>
 {message.map((chat , i)=>{
   return(
    <p key={i} className={`chat__message ${user.displayName == chat.name && `chat__receiver`}`}>
        <span className='chat__name'>{chat.name.length<20 ? chat.name : chat.name.slice(0,20)+"..." }</span>
       { chat.message}
        <span className='chat__time'>{new Date(chat.timestamp?.seconds*1000).toLocaleTimeString()}</span>
    </p>
   )
   })
}
 </div>
 <div className='chat__footer'>
  <EmojiEmotionsIcon/>
  <AttachFileIcon/>
  <form onSubmit={sendMessage}>
    <input type='text' value={input} placeholder='Type Your message' onChange={(e)=>setInput(e.target.value)}/>
    <button type='submit'><SendIcon/></button>

  </form>
  <MicIcon/>
 </div>
    </div>
:
<div className='whatsapp'>
   <img src={whatsapp} />
</div>  
}
</>
  )
}

export default chat;