import './Quiz.css'
import { data } from '../../assets/data'
import { useRef, useState ,useEffect} from 'react'
const Quiz=()=>{
  let [index,setIndex]=useState(0)
  let [question,setQuestion]=useState(data[index])
  // let [lock,setLock]=useState(false)
  let [score,setScore]=useState(0)
  let [result,setResult]=useState(false)
  let [timeLeft,setTimeLeft]=useState(10)

  let option1=useRef(null)
  let option2=useRef(null)
  let option3=useRef(null)
  let option4=useRef(null)

  let options_array=[option1,option2,option3,option4]
  useEffect(() => {
    if (timeLeft === 0) {
      next(); // Move to the next question when the timer reaches 0
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on component unmount or question change
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(10); // Reset to 10 seconds for each new question
  }, [index]);

  const setAns=(e,ans)=>{
    
      if(question.ans===ans){
        e.target.classList.add('correct')
        
        setScore(prev=>prev+1)
  
      }
      else{
        e.target.classList.add('wrong')
        
        options_array[question.ans-1].current.classList.add('correct')
      }
    
  }
  const next=()=>{
    if(index===data.length-1){
      setResult(true)
    }
    
      setIndex(++index)
      setQuestion(data[index])
      
      options_array.map((option)=>{
        option.current.classList.remove('correct')
        option.current.classList.remove('wrong')
        return null
      })
      setTimeLeft(10)
    
  }
  const reset=()=>{
    setIndex(0)
    
    setQuestion(data[0])
    setResult(false)
    setScore(0)
    setTimeLeft(10)

  }
  return(
    <div className="container">
      <h1>Quiz-App</h1>
      <hr className='horizontal'/>
      {result?<></>:<>
        <h2 className='question'>{index+1}.{question.question}</h2>
        <h3>Time:{timeLeft}s</h3>
      <ul>
        <li ref={option1} onClick={(e)=>{setAns(e,1)}}>{question.option1}</li>
        <li ref={option2} onClick={(e)=>{setAns(e,2)}}>{question.option2}</li>
        <li ref={option3} onClick={(e)=>{setAns(e,3)}}>{question.option3}</li>
        <li ref={option4} onClick={(e)=>{setAns(e,4)}}>{question.option4}</li>
        
      </ul>
      <button onClick={next} className='next'>Next</button>
      <div className="index">{index+1} out of {data.length} Questions</div></>}
      {result?<><h2>Your score:{score}</h2>
      <button onClick={reset}>Reset</button></>:<></>}
      
      
    </div>
  )
}
export default Quiz