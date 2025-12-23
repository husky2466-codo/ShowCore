# Market Analytics Specification

## Overview
Market Analytics provides transparent rate guidance, market trends, and pay band data for both technicians and companies. Users start with a customizable overview dashboard showing baseline metrics (average rates, trending skills, regional insights), then can drill down using comprehensive filters to compare rates across skills, tiers, regions, event types, and time periods. The section includes personal benchmarking, saved layouts, AI-powered predictions, and tiered archive access for historical data beyond one year.

## User Flows

1. **View Overview Dashboard**
   - User lands on Market Analytics
   - Sees baseline metrics: average market rate for their skill/tier, trending rates in their region, most in-demand skills
   - Receives alerts/insights (e.g., "Rates for Advanced tier lighting technicians increased 12% this quarter")
   - Can see personal benchmark: their own historical rates compared to market average

2. **Filter & Compare Market Data**
   - User applies filters: skill type, tier level, region/market, event type, date range (up to 1 year by default)
   - Views data in multiple chart types: line charts (trends over time), bar charts (comparisons across categories), distribution charts (rate ranges/percentiles)
   - Compares specific named events (e.g., "Coachella 2024 vs Coachella 2025")
   - Customizes which metrics and charts to display

3. **Save Custom Layouts**
   - User customizes dashboard layout and filter presets
   - Saves layout with a name (e.g., "LA Sound Engineer Rates")
   - Returns to saved layouts on future visits

4. **Access Historical Archive** (Pro/Enterprise company tiers only)
   - User with eligible subscription accesses archive section
   - Views data from 1-3 years historical range
   - Uses same filtering and visualization tools on archived data

5. **View AI-Powered Insights & Predictions**
   - User sees AI-generated predictions on dashboard (e.g., "Based on trends, rates for your skill are projected to increase 8% next quarter")
   - Receives personalized recommendations (e.g., "Sound engineers with Dante certification earn 15% more on average")
   - Views predicted rate trends on charts (projected future data points shown alongside historical data)
   - Gets skill demand forecasts (e.g., "High demand expected for LED wall technicians in Q3")

## UI Requirements

- **Overview Dashboard**: Cards displaying key metrics (average rates, trending skills, regional insights, personal alerts)
- **Filter Panel**: Sidebar or collapsible panel with filters for skill type, tier level, region, event type, date range
- **Multiple Chart Types**: Line charts for trends, bar charts for comparisons, distribution charts for rate ranges (showing 25th, 50th, 75th percentiles)
- **Personal Benchmark**: Visual indicator (line, badge, or highlight) showing user's own rates vs market average on relevant charts
- **Customization Controls**: UI to toggle chart types, reorder metrics, save/load layout presets
- **Archive Access Gate**: Clear indication when archive section is locked, with prompt to upgrade subscription for Pro/Enterprise tiers
- **Named Event Comparison**: Ability to search and select specific events by name for year-over-year comparison
- **AI Insights Panel**: Dedicated section or cards displaying AI-generated predictions, recommendations, and forecasts
- **Prediction Visualization**: Chart overlays showing projected future trends (distinguished visually from historical data, e.g., dashed lines or different opacity)
- **Insight Badges**: Visual indicators highlighting AI-generated insights (with "AI" or sparkle icon to denote predictions)
- **Responsive Design**: Mobile-friendly filters and charts that adapt to smaller screens
- **Light & Dark Mode**: All charts, data visualizations, and AI insights readable in both modes

## Out of Scope

- Downloading or exporting individual technician personal data
- Data that could identify specific individual technicians (privacy protection - all data is aggregated/anonymized)
- Real-time data streaming (data updates on a defined refresh schedule)
- Technician subscription tiers (to be added later - for now, all technicians have basic access)

## Role-Based Views

### Technician View
- See market rates for their skills (what to charge)
- Compare their rates to market averages
- View demand trends for their skill set
- Get AI recommendations for rate adjustments
- Personal benchmark comparison (their performance vs market)
- Focus: "Am I charging appropriately?"

### Company View
- See market rates for skills they hire (what to pay)
- Compare what they pay vs market averages
- View supply/availability trends
- Budget planning insights
- Focus: "Are we paying fair market rates?"

### Shared Features
- Same underlying market data
- Same filtering options (skill, tier, region, event type)
- Same historical trends and charts
- Different framing/copy based on role

## Configuration
- shell: true
