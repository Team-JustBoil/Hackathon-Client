import React, { useState, useEffect } from "react";
import './WordShow.css'
import FinalView from '../FinalView/FinalView.jsx';

function WordShow({ text, currentWordIndex, incrementWordIndex, readSpeed,isTimerRunning, toggleTimer,onFinalView  }) {
    const [wordArray, setWordArray] = useState([]); // 단어리스트
    const [wordCount, setWordCount] = useState(0); // 사용되지 않는 상태일 수 있음
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [displayWord, setDisplayWord] = useState(''); // 화면에 표시될 단어
    const [saveIndex, setSaveIndex] = useState([]); // 선택된 인덱스들을 저장하는 상태
    const [localFinalViewGo,setLocalFinalViewGo] = useState(false);

    // 진행률 계산
    const progressPercentage = wordCount > 0 ? (currentWordIndex / wordCount) * 100 : 0;

    const loadWordList = async () => {
        if (isLoading) return;
        setIsLoading(true);
    
        // 서버 통신
        const url = `https://www.just-ai.o-r.kr/process/word`;
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }) // JSON 데이터 전송
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setWordArray(data.list); // 데이터 리스트 저장
            setWordCount(data.count); // 단어 개수
            setIsLoading(false);
            console.log(wordCount);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        loadWordList();
        console.log("load Word List!");
    }, []); // text와 loadWordList가 변경될 때만 호출

    useEffect(() => {
        if (wordArray.length > 0) {
            setDisplayWord(wordArray[currentWordIndex]);
        }
    }, [currentWordIndex, wordArray]);

    useEffect(() => {
        let timer;
        if (wordArray.length > 0 && readSpeed > 0 && isTimerRunning && currentWordIndex < wordCount ) {
            timer = setInterval(() => {
                incrementWordIndex();
            }, (1/(readSpeed/60)) * 1000);
        }

        return () => clearInterval(timer);
    }, [wordArray, readSpeed, incrementWordIndex, isTimerRunning]);

    const handleImageClick = () => {
        setSaveIndex(prevIndices => {
            // 이미 저장된 인덱스가 아니라면 추가
            if (!prevIndices.includes(currentWordIndex)) {
                return [...prevIndices, currentWordIndex];
            }
            return prevIndices;
        });
        console.log(saveIndex,'saveIndex');
    };
  
      const imageSrc = saveIndex.includes(currentWordIndex)
          ? "src/Components/TextShow/SentenceShow/Bookmark1.png" // 저장된 인덱스 이미지
          : "src/Components/TextShow/SentenceShow/Bookmark0.png"; // 기본 이미지

          useEffect(() => {
            if (currentWordIndex === wordCount - 1) {
                onFinalView(); // finalViewGo 상태를 true로 변경
                setLocalFinalViewGo(true);
            }
        }, [currentWordIndex, wordCount, onFinalView]);
        return (
            <>
                {localFinalViewGo ? (
                    <FinalView 
                    array={wordArray}
                    saveIndex = {saveIndex}
                    />
                ) : (
                    <main>
                        <img src={imageSrc}  
                              alt="" 
                              className="book-mark"
                              onClick={handleImageClick}  />
                        <div className="word-show"> {displayWord} </div> {/* 화면에 단어 표시 */}
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </main>
                )}
            </>
            )
}

export default WordShow;
