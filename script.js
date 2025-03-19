// 載入天氣數據
function loadWeatherData() {
    const apiKey = 'CWA-2C39FF03-6175-4B8C-B7EA-83DC00BCBAD0'; // 用你自己的API密鑰
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/W-C0033-001?Authorization=${apiKey}&limit=100&locationName=%E8%87%BA%E5%8C%97%E5%B8%82,%E6%96%B0%E5%8C%97%E5%B8%82,%E6%A1%83%E5%9C%92%E5%B8%82,%E8%87%BA%E4%B8%AD%E5%B8%82&phenomena=`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <p>地點：${data.name}</p>
                <p>天氣：${data.weather[0].description}</p>
                <p>氣溫：${data.main.temp}°C</p>
                <p>濕度：${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            console.error('天氣數據載入錯誤:', error);
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = '<p>無法載入天氣數據</p>';
        });
}

// 載入衛星雲圖
function loadSatelliteImage() {
    const satelliteUrl = 'https://api.nasa.gov/planetary/earth/imagery?lon=121.5654&lat=25.0330&dim=0.10&api_key=YOUR_NASA_API_KEY';
    
    fetch(satelliteUrl)
        .then(response => response.json())
        .then(data => {
            const satelliteImage = document.getElementById('satellite-image');
            satelliteImage.innerHTML = `<img src="${data.url}" alt="衛星雲圖" style="width:100%; height:auto;">`;
        })
        .catch(error => {
            console.error('衛星雲圖載入錯誤:', error);
            const satelliteImage = document.getElementById('satellite-image');
            satelliteImage.innerHTML = '<p>無法載入衛星雲圖</p>';
        });
}

// 定期更新天氣與衛星雲圖
setInterval(() => {
    loadWeatherData();
    loadSatelliteImage();
}, 60000); // 每60秒更新一次

// 初始化載入
window.onload = () => {
    loadWeatherData();
    loadSatelliteImage();
};
