import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState(''); // 사용자가 입력할 URL
    const [linkFound, setLinkFound] = useState(false); // 특정 링크 발견 여부
    const [error, setError] = useState(''); // 오류 메시지
    const [loading, setLoading] = useState(false); // 로딩 상태

    const handleInputChange = (e) => {
        setUrl(e.target.value); // 입력값 업데이트
    };

    const fetchLinks = async () => {
        if (!url) {
            setError('URL을 입력하세요.'); // URL이 비어있을 경우 경고 메시지
            return;
        }

        setError(''); // 오류 초기화
        setLoading(true); // 로딩 시작

        try {
            const response = await axios.post('/api/crawl', { url });
            const links = response.data.links || [];

            // '/shop/shopbrand.html' 링크가 있는지 확인
            if (links.includes('/shop/shopbrand.html')) {
                setLinkFound(true); // 링크 발견 시 상태 업데이트
            } else {
                setLinkFound(false); // 링크 미발견 시 상태 업데이트
            }
        } catch (err) {
            setError('데이터를 가져오는 데 실패했습니다.'); // 오류 처리
            console.error(err);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <div>
            <h1>URL 크롤링기</h1>
            <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="크롤링할 URL 입력"
            />
            <button onClick={fetchLinks}>크롤링</button>

            {loading && <p>로딩 중...</p>} {/* 로딩 메시지 */}

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 표시 */}

            {linkFound && <p>mk</p>} {/* 링크 발견 시 "mk" 텍스트 표시 */}
        </div>
    );
}

export default App;
