import React,{useState,useEffect} from "react";

function BottomBar({ 
    onHandleReadSpeed,
    readState, 
    onBackButtonClick,
    onFrontButtonClick,
    toggleTimer,
    backBtnRef,
    frontBtnRef,
    stopgoBtnRef
    }) {
        
    const [speed,setSpeed] = useState(1);

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };

    const handleStopGoClick = () => {
        toggleTimer(); // 타이머 상태를 토글
    };

    useEffect(() => {
        // 부모 컴포넌트에서 readState가 변경될 때마다 속도를 초기화
        setSpeed(1);
    }, [readState]);

    return(
    <>
        {readState === 0 && (
                <div className="speed-changer">
                    <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        step="4" 
                        value={speed} 
                        onChange={handleSpeedChange} 
                    />
                    <span>예상 시간: {0} {/* 수정 필요 */}</span>
                </div>
        )}
        <div>
            <button ref={backBtnRef} className="back" onClick={onBackButtonClick}></button>
            <button ref={stopgoBtnRef} className="stopGo" onClick={handleStopGoClick} ></button>
            <button ref={frontBtnRef} className="front" onClick={onFrontButtonClick}></button>
        </div>
    </>
    );
}

export default BottomBar;