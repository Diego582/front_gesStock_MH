import {
    Card,
    CardContent,
    Typography,
    useTheme,
  } from '@mui/material';
  import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
  } from 'recharts';
  
  const datos = [
    { name: 'Ene', compras: 400 },
    { name: 'Feb', compras: 300 },
    { name: 'Mar', compras: 500 },
  ];
  
  export default function DashboardCompras() {
    const theme = useTheme();
  
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6">Compras Mensuales</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={datos}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="compras" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }
