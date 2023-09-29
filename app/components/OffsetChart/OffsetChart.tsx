import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ padding: 8, border: '1px solid #EEE', backgroundColor: '#FFF' }}>
        <p style={{ marginBottom: 4, fontWeight: 700 }}>{label}</p>
        <p>CO2 Offset: {payload[0].value.toFixed(2)}lbs</p>
      </div>
    );
  }
  return null;
};

const OffsetChart = ({ data }) => {
  console.log('data', data)
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }} data={data}>
      <Line type="monotone" dataKey="value" stroke="#007b5c" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip content={CustomTooltip} />
      </LineChart>
    </ResponsiveContainer>
  )
};

export default OffsetChart;
