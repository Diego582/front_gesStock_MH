// src/pages/DashboardStock.jsx
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
  
  const pieDataStock = [
    { name: "Alta rotación", value: 500 },
    { name: "Media rotación", value: 300 },
    { name: "Baja rotación", value: 100 },
  ];
  
  const barDataStock = [
    { name: "Depósito 1", ingreso: 320, egreso: 140 },
    { name: "Depósito 2", ingreso: 260, egreso: 180 },
    { name: "Depósito 3", ingreso: 200, egreso: 100 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  
  export function DashboardStock() {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Stock
        </Typography>
  
        <Grid container spacing={2}>
          {[{ label: "Productos en stock", value: "2.340" },
            { label: "Stock crítico", value: "45" },
            { label: "Depósitos", value: "3" },
            { label: "Último ingreso", value: "Hace 1 hora" },
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
                  Rotación de productos
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={pieDataStock}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {pieDataStock.map((entry, index) => (
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
                  Ingresos y egresos por depósito
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={barDataStock}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ingreso" fill="#1976d2" name="Ingreso" />
                    <Bar dataKey="egreso" fill="#ef5350" name="Egreso" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
