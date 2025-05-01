import { useState ,useEffect,useRef} from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import {nanoid} from "nanoid"
export default function App(){
  const [dice,setDice] = useState( () =>generateNewDice())
  const buttonref = useRef(null);

  const gamewon = dice.every(die => die.isHeld) &&
 dice.every(die=>die.value === dice[0].value)
 
 useEffect(()=>{
  if(gamewon){
    buttonref.current.focus();
  }

 },[gamewon])

  function generateNewDice(){
    // const newDice =[];
    // for( let i=0; i< 10 ; i++){
    //   const rand = Math.ceil(Math.random() * 6)
    //   newDice.push(rand)
    // }
    // return newDice;
    return new Array(10).fill(0)
    .map(()=> (
      {
        value:Math.ceil(Math.random()*6),
        isHeld:false ,
        id: nanoid()
      }
    ))
  }


  function rolldice(){
    if(gamewon){
     setDice( generateNewDice())
    }
    else{
      setDice(oldDice => 
        oldDice.map(data => 
          ! data.isHeld ? {...data ,  value:Math.ceil(Math.random()*6)} : data
        ))
    }
 
  }

  function hold(id){
    setDice( oldDice => {
      return oldDice.map(die =>{
       return die.id === id ? {...die,isHeld: !die.isHeld}:die
      })
    })
  }



  const diceElement = dice.map((data)=>{
    return (
  <Die
  key={data.id}
  value={data.value}
  isHeld = {data.isHeld}
  hold={()=>hold(data.id)}
  
  />
  
    )
  })
  
  return(
   <div className="container">
    {gamewon && <Confetti/>}
    <div className="gameheader"> 
      <h1>Tenzies Game</h1>
<p>roll until the all box not get same</p>
    </div>
  <div
  className="diceContainer">
{diceElement}
  </div>
  <button
  ref={buttonref}
  className="rollbtn"
  onClick={rolldice}>{gamewon ? "New Game": "roll_it"}</button>
   </div>
  )
}