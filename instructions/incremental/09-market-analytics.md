# Milestone 9: Market Analytics

Rate guidance, market trends, and data visualization.

---

## Rate Guidance

### Rate Calculation Factors
- Skill category
- Experience tier
- Location/market
- Event type
- Demand level

### Rate Display
- Suggested rate range (min-max)
- Market average
- Your current rate vs market
- Rate trend (up/down/stable)

### Recommendations
- "Your rate is below market average"
- "Consider raising rates for high-demand skills"
- "Premium rates available for Pro tier"

---

## Market Trends

### Demand Charts
- Bookings by skill over time
- Seasonal patterns
- Geographic hotspots
- Event type distribution

### Rate Trends
- Average rates by skill
- Rate changes over time
- Comparison by location
- Tier-based differentials

### Insights
- "Audio engineers in high demand"
- "Rates trending up 15% YoY"
- "Corporate events peak in Q4"

---

## Analytics Dashboard

### MetricCard
- Large number display
- Trend indicator (arrow + percentage)
- Comparison period
- Sparkline (optional)

### ChartPlaceholder
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distribution
- Interactive tooltips

### InsightCard
- AI-generated insight
- Data visualization
- Actionable recommendation
- Dismiss/save option

---

## Features

### Event Comparison
- Compare event types
- Rate ranges by category
- Demand levels
- Booking success rates

### Saved Layouts
- Customize dashboard
- Drag-and-drop widgets
- Save configurations
- Share layouts

### Filters
- Date range selector
- Location filter
- Skill filter
- Event type filter

### Export
- Download as CSV
- Download as PDF
- Schedule reports
- Email digest

---

## Data Sources

### Aggregated Data
- All platform bookings
- Rate information
- Review scores
- Show proofs

### Privacy
- No individual identification
- Minimum sample sizes
- Anonymized trends
- Opt-out available

---

## Implementation

### 1. Create Analytics Pages
Reference: `sections/market-analytics/components/`

### 2. Chart Library
Options:
- Recharts (recommended)
- Chart.js
- Visx
- Nivo

### 3. Data Aggregation
Server-side aggregation for performance.

---

## tRPC Procedures

```typescript
// Rate guidance (planned)
const rateGuide = await trpc.analytics.rateGuidance.query({
  skillId: 'skill-audio',
  location: 'Los Angeles',
  tier: 'ADVANCED',
})

// Market trends (planned)
const trends = await trpc.analytics.trends.query({
  metric: 'demand',
  skillId: 'skill-audio',
  dateRange: { start, end },
})
```

Note: Analytics procedures may need to be added to the backend.

---

## Verify

- [ ] Rate guidance shows relevant data
- [ ] Charts render correctly
- [ ] Filters update visualizations
- [ ] Insights are contextual
- [ ] Export functions work
- [ ] Mobile layout is responsive

---

*Next: Milestone 10 - Settings*
