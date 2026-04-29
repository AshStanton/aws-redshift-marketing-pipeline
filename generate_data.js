const fs = require('fs');
const path = require('path');

const NUM_FACTS = 1000;
const NUM_CAMPAIGNS = 15;
const BASE_DATE = '2024-01-01';

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const channels = ['Google Ads', 'Facebook', 'LinkedIn'];
const audiences = ['B2B', 'B2C', 'Enterprise'];
const namePrefixes = ['Awareness', 'Retargeting', 'Prospecting', 'Brand'];

let campaigns = [];
for (let i = 1; i <= NUM_CAMPAIGNS; i++) {
    const id = `CAMP${String(i).padStart(3, '0')}`;
    const name = `Campaign_${randomChoice(namePrefixes)}${i}`;
    campaigns.push({
        campaign_id: id,
        campaign_name: name,
        channel: randomChoice(channels),
        target_audience: randomChoice(audiences),
        start_date: BASE_DATE,
        end_date: new Date(new Date(BASE_DATE).getTime() + randomInt(30, 90) * 86400000).toISOString().slice(0, 10)
    });
}

// Write dimension CSV
const dimHeader = 'campaign_id,campaign_name,channel,target_audience,start_date,end_date';
const dimRows = campaigns.map(c => `${c.campaign_id},${c.campaign_name},${c.channel},${c.target_audience},${c.start_date},${c.end_date}`).join('\n');
fs.writeFileSync('dim_campaigns.csv', dimHeader + '\n' + dimRows);

// Generate fact JSONL
let factLines = [];
for (let i = 0; i < NUM_FACTS; i++) {
    const camp = randomChoice(campaigns);
    const dayOffset = randomInt(0, 90);
    const performanceDate = new Date(new Date(BASE_DATE).getTime() + dayOffset * 86400000).toISOString().slice(0, 10);
    factLines.push(JSON.stringify({
        campaign_id: camp.campaign_id,
        performance_date: performanceDate,
        impressions: randomInt(1000, 500000),
        clicks: randomInt(50, 25000),
        spend: Math.round((Math.random() * 4990 + 10) * 100) / 100,
        conversions: randomInt(1, 800)
    }));
}
fs.writeFileSync('campaign_performance_20240101.jsonl', factLines.join('\n'));
console.log('✅ Generated dim_campaigns.csv and campaign_performance_20240101.jsonl');
