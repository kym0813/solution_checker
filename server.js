const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/crawl', (req, res) => {
    const url = req.body.url;
    console.log('Received URL:', url); // 요청된 URL 출력

    // 여기에 크롤링 로직 추가
    const links = ['/shop/shopbrand.html', '/shop/anotherpage.html']; // 예시 링크
    res.json({ links });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
