SELECT 
    d.campaign_name,
    d.channel,
    SUM(f.spend) AS total_spend,
    SUM(f.conversions) AS total_conversions,
    ROUND(SUM(f.spend)/NULLIF(SUM(f.clicks),0),2) AS cpc
FROM fact_campaign_performance f
JOIN dim_campaigns d ON f.campaign_id = d.campaign_id
GROUP BY 1,2
ORDER BY total_spend DESC
LIMIT 10;
