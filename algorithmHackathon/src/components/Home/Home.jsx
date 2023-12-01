import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import uploadIcon from './upload-icon.png';
import SliderControl from './SliderControl'; // SliderControl 컴포넌트를 불러옵니다.

const Home = () => {
  const [sliderValue, setSliderValue] = useState(200);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const navigate = useNavigate();

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('파일이 변경되었습니다.');
  };

  useEffect(() => {
    if (selectedFile) {
      handleFileUpload();
    }
  }, [selectedFile]);

  const handleFileUpload = async () => {
    console.log('bbb');
    if (!selectedFile) return;
    console.log('aaa');
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log('전송할 파일:', formData.get('file'));

    try {
      const response = await fetch('https://www.just-ai.o-r.kr/ocr', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // 필요한 경우 추가 헤더를 추가하세요
        },
      });

      // 필요한 대로 응답을 처리하세요
      console.log('파일 업로드 응답:', response);
    } catch (error) {
      console.error('파일 업로드 오류:', error);
    }
  };

  const handleButton1Click = () => {
    // Navigate to /about when Button 1 is clicked
    console.log('단어별로 읽기 - 텍스트 내용:', textareaValue);
    // <TextShow text={textareaValue} readState={0} readSpeed={sliderValue}/>
    navigate('/wordpage', {
      state: {
        text: textareaValue,
        readState: 1,
        readSpeed: sliderValue,
      }
    });
  };

  const handleButton2Click = () => {
    // Navigate to /services when Button 2 is clicked
    console.log('문장별로 읽기 - 텍스트 내용:', textareaValue);
    navigate('/sentence', {
      state: {
        text: textareaValue,
        readState: 0,
        readSpeed: sliderValue,
      }
    });
  };

  return (
    <div className="home">
      <div className="content">
        <br />
        <br />
        <textarea
          className="input"
          placeholder="텍스트를 입력하세요"
          value={textareaValue}
          onChange={handleTextareaChange}
        ></textarea>
        <div className="file-upload-container">
          {selectedFile && <p>선택된 파일: {selectedFile.name}</p>}
          {/* 라벨 삭제 */}
          <img
            src={uploadIcon}
            alt="Upload"
            className="upload-icon"
            style={{ cursor: 'pointer' }}
            onClick={() => document.getElementById('fileUpload').click()} // 파일 업로드 버튼 클릭
          />
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="buttons_content">
        <div className="upper-btns">
          {/* 위에 있는 칸 */}
          <span className="play-text">재생</span> 
          <span className="speed-text">속도</span>
          <SliderControl value={sliderValue} onChange={handleSliderChange} />
        </div>
        <div className="middle-btns">
          {/* 중간에 있는 칸 */}
          <button className="word-btn" onClick={handleButton1Click}><span>단어</span>별로 읽기</button>
        </div>
        <div className="lower-btns">
          {/* 아래에 있는 칸 */}
          <button className="sentence-btn" onClick={handleButton2Click}><span>문장</span>별로 읽기</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
