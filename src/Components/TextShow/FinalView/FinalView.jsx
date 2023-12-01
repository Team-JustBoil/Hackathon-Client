import React,{useState,useEffect} from "react";

function FinalView({saveIndex,array}) {
    const [isLoading,setIsLoading] = useState(false);
    const [topArray,setTopArray] = useState([]);

    const finalLoading = async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        // 서버 통신
        const url = `https://www.just-ai.o-r.kr/top`;
        const payload = {
        "list": array, // 여기서 'array'는 보내고자 하는 첫 번째 리스트
        "bookmarks": saveIndex // 'saveIndex'는 보내고자 하는 두 번째 리스트
    };
        //함수
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload) // JSON 데이터 전송
        })
        .then(response => response.json())
        .then(data => {
            console.log('final loading');
            setTopArray(data.keywords);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsLoading(false);
        });
    };
        useEffect(()=>{
            console.log('list :',array ,'bookmarks :' ,saveIndex);
            finalLoading();
            console.log('z');
        })
    return (
        <>
            <p>축하합니다 완 독 하셨습니다. </p>

            <div>
                {topArray && topArray.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
                ))}
                <div>
                {array.map((item, index) => {
                // saveIndex에 현재 인덱스가 포함되어 있는지 확인
                if (saveIndex.includes(index)) {
                    return (
                        <div key={index}>
                            {item} {/* 조건을 만족하는 요소만 렌더링 */}
                        </div>
                    );
                }
                return null; // 조건을 만족하지 않으면 렌더링하지 않음
            })}
        </div>
            </div>

            <div>
                내가 체크한 문장수 : {saveIndex.length}
            </div>
        </>
    );
}
export default FinalView;