import React,{useState,useEffect} from "react";
import FinalView from '../FinalView/FinalView.jsx';
import './SentenceShow.css';

function SentenceShow({ text, currentWordIndex ,incrementWordIndex,onFinalView }) {
    const [sentenceArray,setSentenceArray] = useState([]); //문장리스트
    const [sentenceCount,setSentenceCount] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [displaySentence, setDisplaySentence] = useState(''); // 화면에 표시될 단어
    const [saveIndex, setSaveIndex] = useState([]); // 선택된 인덱스들을 저장하는 상태
    const [localFinalViewGo,setLocalFinalViewGo] = useState(false);

    // 진행률 계산
    const progressPercentage = sentenceCount > 0 ? (currentWordIndex / sentenceCount) * 100 : 0;

    const loadSentenceList = async () => {
        if (isLoading) return;
        setIsLoading(true);
    
        // 서버 통신
        const url = `https://www.just-ai.o-r.kr/process/sentence`;
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }) // 객체를 JSON 문자열로 변환
        })
        .then(response => response.json())
        .then(data => {
            // json 처리
            console.log(data);
            // 데이터 처리
            setSentenceArray(data.list); // 데이터 리스트 저장
            setSentenceCount(data.count); // 리스트 개수
            setIsLoading(false);
            console.log(sentenceCount);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoading(false);
        });
      };
      
      useEffect(() => {
        if (sentenceArray.length > 0) {
            setDisplaySentence(sentenceArray[currentWordIndex]);
        }
    }, [currentWordIndex, sentenceArray]);

      useEffect(()=>{
        loadSentenceList();
        console.log("load Sentence List !");
      },[])

      
      // SentenceShow 컴포넌트 내부
      useEffect(() => {
        const handleSpacebar = (event) => {
            if (event.code === "Space") {
                incrementWordIndex();
            }
        };

        window.addEventListener('keydown', handleSpacebar);

        return () => {
            window.removeEventListener('keydown', handleSpacebar);
        };
      }, [incrementWordIndex]);

      // 문장 저장
      const handleImageClick = () => {
        setSaveIndex(prevIndices => {
            if (prevIndices.includes(currentWordIndex)) {
                // 이미 저장된 인덱스라면 제거
                return prevIndices.filter(index => index !== currentWordIndex);
            } else {
                // 저장되지 않은 인덱스라면 추가
                return [...prevIndices, currentWordIndex];
            }
        });
    };

    const imageSrc = saveIndex.includes(currentWordIndex)
        ? "src/Components/TextShow/SentenceShow/Bookmark1.png" // 저장된 인덱스 이미지
        : "src/Components/TextShow/SentenceShow/Bookmark0.png"; // 기본 이미지


        useEffect(() => {
          if (currentWordIndex === sentenceCount - 1) {
              onFinalView(); // finalViewGo 상태를 true로 변경
              setLocalFinalViewGo(true);
          }
      }, [currentWordIndex, sentenceCount, onFinalView]);

    return(
        <>
          {localFinalViewGo ? (
                    <FinalView 
                    array={sentenceArray}
                    saveIndex = {saveIndex}
                    />
                ) : (
                    <main>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <img src={imageSrc}  
                              alt="" 
                              className="book-mark"
                              onClick={handleImageClick}  />
                        <div className="word-show"> {displaySentence} </div> {/* 화면에 단어 표시 */}
                    </main>
                )}
        </>
    );
}

export default SentenceShow;