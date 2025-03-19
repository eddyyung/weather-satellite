// 載入風災警報數據
function loadHazardData() {
    const apiUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/W-C0033-001?Authorization=CWA-2C39FF03-6175-4B8C-B7EA-83DC00BCBAD0'; // 替換成你的中央氣象署API URL
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const hazardInfo = document.getElementById('hazard-info');
            if (data.success === "true" && data.result) {
                let hazardDetails = '';
                data.records.location.forEach(location => {
                    const locationName = location.locationName;
                    const hazards = location.hazardConditions.hazards;

                    if (hazards.length > 0) {
                        hazards.forEach(hazard => {
                            const phenomena = hazard.info.phenomena;
                            const significance = hazard.info.significance;
                            const startTime = hazard.validTime.startTime;
                            const endTime = hazard.validTime.endTime;
                            hazardDetails += `
                                <p><strong>${locationName}</strong></p>
                                <p>現象: ${phenomena}</p>
                                <p>警報級別: ${significance}</p>
                                <p>生效時間: ${startTime} 至 ${endTime}</p>
                                <hr>
                            `;
                        });
                    } else {
                        hazardDetails += `<p><strong>${locationName}</strong> 無風災警報</p><hr>`;
                    }
                });
                hazardInfo.innerHTML = hazardDetails;
            } else {
                hazardInfo.innerHTML = '<p>無法載入風災警報資料</p>';
            }
        })
        .catch(error => {
            console.error('風災警報數據載入錯誤:', error);
            const hazardInfo = document.getElementById('hazard-info');
            hazardInfo.innerHTML = '<p>無法載入風災警報資料</p>';
        });
}

// 定期更新風災警報
setInterval(() => {
    loadHazardData();
}, 60000); // 每60秒更新一次

// 初始化載入
window.onload = () => {
    loadHazardData();
};
