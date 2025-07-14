import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateProduct from "./CreateProduct";
import product_actions from "../store/actions/products";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import CrudSales from "./CrudSales";
import comprobante_check_actions from "../store/actions/comprobanteCheck";

const { destroy_comprobante_check } = comprobante_check_actions;

const { read_products } = product_actions;

export default function TableSales({
  openCreate,
  setOpenCreate,
  total,
  setTotal,
}) {
  /*   const data = useSelector((store) => store[dataStore][dataStore]); */
  const dispatch = useDispatch();
  /*  const data = useSelector((store) => store.products.products); */
  const [product, setProduct] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const data = useSelector((store) => store.comprobantesCheck.compsChecks);

  const handleDelete = (item) => {
    dispatch(destroy_comprobante_check(item))
      .then((res) => {})
      .catch((err) => {});
  };

  const columns = [
    {
      field: "codigoBarras",
      headerName: "Código deBarras",
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
    },
    {
      field: "price",
      headerName: "Precio",
    },
    {
      field: "amount",
      headerName: "Cantidad",
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
    },
    { field: "actions", headerName: "Acciones" },
  ];

  const handleSelected = (product, option) => {
    setProduct(product);
    option === "Edit" ? handleOpenCloseEdit() : handleOpenCloseDelete();
  };

  const handleOpenCloseEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOpenCloseDelete = () => {
    setOpenDelete(!openDelete);
  };
  if (data) {
    setTotal(data.reduce((a, b) => a + b.amount * b.price, 0));
  }

  useEffect(() => {
    /* dispatch(read_products()); */
  }, []);

  return (
    <>
      <CrudSales />
      <Divider />

      {data && data.length > 0 ? (
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  return (
                    <TableCell key={index} sx={{ p: 2 }}>
                      {column.headerName}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow
                    sx={{
                      borderRadius: "10px",
                      backgroundColor:
                        index % 2 === 0 ? "rgba(157, 85, 82, 0.3)" : "white",
                    }}
                    key={index}
                  >
                    {columns.map((column, colIndex) => {
                      if (column.field == "price") {
                        return (
                          <TableCell key={colIndex} sx={{ p: 0, pl: 2 }}>
                            {"$ "}
                            {item.price && item.price.toFixed(2)}
                          </TableCell>
                        );
                      }
                      if (column.field == "subtotal") {
                        return (
                          <TableCell key={colIndex} sx={{ p: 0, pl: 2 }}>
                            {"$ "}
                            {item.price &&
                              (item.price * item.amount).toFixed(2)}
                          </TableCell>
                        );
                      }
                      if (column.field != "actions") {
                        return (
                          <TableCell key={colIndex} sx={{ p: 0, pl: 2 }}>
                            {item[column.field]}
                          </TableCell>
                        );
                      }
                    })}
                    <TableCell>
                      <Box>
                        <IconButton onClick={() => handleDelete(item)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No hay datos que mostrar</Typography>
      )}
    </>
  );
}
