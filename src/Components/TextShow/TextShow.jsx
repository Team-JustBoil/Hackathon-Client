import React,{useState,useEffect,useRef} from "react";
import BottomBar from './BottomBar/BotttomBar';
import WordShow from './WordShow/WordShow';
import SentenceShow from './SentenceShow/SentenceShow';
import './TextShow.css'

//받아와야 하는거 (speed , word sentence type)
function TextShow({text,readState,readSpeed}) {
    const [howManyTime,setHowManyTime] = useState(0); // 단어 읽을 때 걸리는 시간

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [localReadSpeed,setLocalReadSpeed] = useState(readSpeed);

    const [isTimerRunning, setIsTimerRunning] = useState(true);

   

    const handleReadSpeed = (newReadSpeed) => {
        setLocalReadSpeed(newReadSpeed);
    };
    
    const incrementWordIndex = () => {
        setCurrentWordIndex(prevIndex => prevIndex + 1);
    };
    

     //버튼 ref
     const backBtnRef = useRef(null);
     const frontBtnRef = useRef(null);
     const stopGoBtnRef = useRef(null);

    //back 버튼
    const handleBackButtonClick = () => {
        setCurrentWordIndex(prevIndex => Math.max(prevIndex - 1, 0));
        backBtnRef.current?.blur();
    };

    //StopGo 버튼
    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    //front 버튼
    const handleFrontButtonClick = () => {
        setCurrentWordIndex(prevIndex => Math.max(prevIndex + 1, 0));
        frontBtnRef.current?.blur();
    };
    
    useEffect(()=>{
        console.log(readState,'readState');
    })
    return (
    <>
        {readState == 0 ? (
          <SentenceShow 
            text={text} 
            currentWordIndex={currentWordIndex}
            incrementWordIndex={incrementWordIndex}
          />
        ) : (
          <WordShow 
            readSpeed ={localReadSpeed} 
            text={text}
            currentWordIndex={currentWordIndex}
            incrementWordIndex={incrementWordIndex}  
            isTimerRunning={isTimerRunning}
            toggleTimer={toggleTimer}
            />
        )}
        <BottomBar 
            onHandleReadSpeed={handleReadSpeed} 
            readState={localReadSpeed}
            onBackButtonClick={handleBackButtonClick}
            onFrontButtonClick={handleFrontButtonClick}
            backBtnRef={backBtnRef}
            frontBtnRef={frontBtnRef}
            stopGoBtnRef={stopGoBtnRef}
            toggleTimer={toggleTimer}
        />
    </>
    );
}
export default TextShow;