import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

export default function TableVentas() {
  /*   const data = useSelector((store) => store[dataStore][dataStore]); */

  const data = [
    {
      _id: "1",
      codigoBarras: 1,
      descripcion: "descripcion",
      categoria: "photo",
      agrupamiento: "category",
    },
    {
      _id: "2",
      codigoBarras: 1,
      descripcion: "descripcion",
      categoria: "categoria",
      agrupamiento: "agrupamiento",
    },
    {
      _id: "3",
      codigoBarras: 1,
      descripcion: "descripcion",
      categoria: "categoria",
      agrupamiento: "agrupamiento",
    },
  ];
  const columns = [
    {
      field: "_id",
      headerName: "ID",
    },
    {
      field: "codigoBarras",
      headerName: "codigoBarras",
    },
    {
      field: "descripcion",
      headerName: "descripcion",
    },
    {
      field: "categoria",
      headerName: "categoria",
    },
    {
      field: "agrupamiento",
      headerName: "agrupamiento",
    },
    { field: "actions", headerName: "Acciones" },
  ];
  return (
    <>
      {data && data.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  return <TableCell key={index}>{column.headerName}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  sx={{
                    borderRadius: "10px",
                  }}
                  key={index}
                >
                  {columns.map((column, colIndex) => {
                    return (
                      <TableCell key={colIndex}>
                        {typeof item[column.field] === "object"
                          ? Object.values(item[column.field])
                          : item[column.field]}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Box>
                      <IconButton onClick={() => handleSelected(item, "Edit")}>
                        <EditIcon color="info" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleSelected(item, "Delete")}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No hay datos que mostrar</Typography>
      )}
    </>
  );
}
