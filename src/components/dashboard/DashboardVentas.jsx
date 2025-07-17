// src/pages/DashboardVentas.jsx
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent
  } from "@mui/material";
  import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
  } from "recharts";
  
  const pieDataVentas = [
    { name: "Online", value: 450 },
    { name: "Tienda Física", value: 300 },
    { name: "Mayoristas", value: 250 },
  ];
  
  const barDataVentas = [
    { name: "Enero", ventas: 240, devoluciones: 40 },
    { name: "Febrero", ventas: 280, devoluciones: 30 },
    { name: "Marzo", ventas: 320, devoluciones: 25 },
    { name: "Abril", ventas: 400, devoluciones: 50 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  
  export default function DashboardVentas() {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Ventas
        </Typography>
  
        <Grid container spacing={2}>
          {[ 
            { label: "Ventas Totales", value: "$124.500" },
            { label: "Promedio Diario", value: "$4.150" },
            { label: "Clientes Nuevos", value: "120" },
            { label: "Actualización", value: "Hace 2 horas" },
          ].map(({ label, value }, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary">{label}</Typography>
                  <Typography variant="h5" fontWeight="bold">{value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
  
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 300, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Canales de Venta
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={pieDataVentas}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {pieDataVentas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 300, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Ventas Mensuales vs. Devoluciones
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={barDataVentas}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventas" fill="#1976d2" name="Ventas" />
                    <Bar dataKey="devoluciones" fill="#ef5350" name="Devoluciones" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }