# AWS Redshift Marketing Analytics Pipeline

A hands‑on personal project demonstrating a serverless data warehouse pipeline on Amazon Redshift.

## What It Does
- Ingests mock Google Ads campaign performance data (JSON) and campaign dimension data (CSV) from Amazon S3
- Uses Redshift Serverless with a star schema (`dim_campaigns`, `fact_campaign_performance`)
- Loads data with COPY commands (JSON and CSV formats)
- Produces an aggregated C‑suite dashboard query showing campaign spend, conversions, and cost‑per‑click

## Architecture
Raw files are stored in an S3 bucket. An IAM role gives Redshift read access. The dimension CSV is loaded first, then the fact JSON is loaded using a JSONPaths file to map nested fields. The final query joins both tables and aggregates key metrics.

## Skills Demonstrated
- Dimensional data modelling (distribution and sort keys)
- Redshift Serverless setup and cost control (8 RPU base capacity)
- IAM role configuration for secure S3 access
- COPY command for CSV and JSON data ingestion
- SQL for business dashboards (aggregation, joins, null handling)
- End‑to‑end pipeline design with cost awareness (project total under £1)

## Project Files
- `generate_data.js` – Node.js script to create 1,000 rows of mock campaign performance data and a 15‑row dimension CSV
- `campaign_jsonpaths.json` – Redshift JSONPaths file for parsing nested JSON
- `dashboard_query.sql` – final aggregation query
- `screenshots/` – Redshift query output

## Author
Ash Stanton – Data Architect  
https://www.linkedin.com/in/ashstanton/
