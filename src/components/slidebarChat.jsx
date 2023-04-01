import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { query, collection,onSnapshot,orderBy } from 'firebase/firestore';
import db from '../firebase/config';

function slidebarChat({addnewchat, id, data, createRoom}) {
const [seed, setSeed] = useState("");
const [lastMessage, setLastMessage] = useState([]);

useEffect(()=>{
  setSeed(Math.floor(Math.random()*5000));
  
  try{
    const snap =  query(collection(db, "rooms/" + id+ "/message"),orderBy('timestamp','desc'));
  onSnapshot(snap,(snapshot) => {
    setLastMessage(snapshot.docs.map((doc) =>{
    return doc.data()}));
  })
} catch (err){
  console.log("Getting Data from Firebase in slidbarChat"+err);
}

},[]);

  return (
    !addnewchat ? (
      <Link className='sliderbarchat__Link' to={`/${id}`}>
    <div className='slidebar__chat'>
        <Avatar src={`https://api.dicebear.com/api/human/${seed}.svg`} />
        <div className='slidebar__chatInfo'>
        <h2>{data}</h2>
        <div className='slidebar__lastseen'>
        <p>{lastMessage[0]?.message.length>30  ? lastMessage[0]?.message.slice(0,30)+"...." : lastMessage[0]?.message}
        </p>
        <p>{new Date(lastMessage[0]?.timestamp?.seconds*1000).toLocaleDateString()}</p>
        </div>
        </div>
    </div> 
    </Link> ) :(
    <div className='slidebar__chat' onClick={createRoom}>
      <h2>Add New chat</h2>
    </div>
    ) 
  )
}

export default slidebarChat;