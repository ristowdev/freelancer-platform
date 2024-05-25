import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart, 
    Pie,
    Cell,
    Sector,
    Text
} from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: 'Page G',
      uv: 50,
      pv: 4300,
      amt: 0,
    },
    {
      name: 'Page G',
      uv: 250,
      pv: 4300,
      amt: 0,
    },
];

export const SimpleChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
                top: 1, 
                left: 1,
                bottom: 1,
            }}
            >
                <Area type="monotone" dataKey="uv" stroke="#5adba4" fill="#ecfbf5" />
            </AreaChart>
        </ResponsiveContainer>
    )
} 


export const AdvancedChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%" >
            <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
                top: 5, 
                right: 5,
                left: 5,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#6b7cf7" fill="#dbe1ff" />
            </AreaChart>
        </ResponsiveContainer>
    )
} 

interface PieChartData {
    name: string;
    value: number;
  }
  
  const renderCustomizedLabel: React.FC<{
    x: number;
    y: number;
    angle: number;
    value: number;
    payload: any;
  }> = ({ x, y, angle, value, payload }) => {
    const radius = 80; // Assuming you're using outerRadius of 80
  
    const radians = angle * (Math.PI / 180);
    const labelX = x + radius * Math.cos(-radians);
    const labelY = y + radius * Math.sin(-radians);
  
    return (
      <Text
        x={labelX}
        y={labelY}
        fill="white"
        textAnchor={labelX > x ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(value * 100).toFixed(0)}%`}
      </Text>
    );
  };
  
  const COLORS = ['#724169', '#f17574', '#f7aa6e'];
  
  export const PieChartExample: React.FC<{ data: PieChartData[] }> = ({ data }) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            // label={renderCustomizedLabel} // Use `label` prop for custom labels
            outerRadius={80}
            innerRadius={60}
            paddingAngle={5}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />  
        </PieChart>
      </ResponsiveContainer>
    );
  };



  
  