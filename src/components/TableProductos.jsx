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

const { read_products } = product_actions;

export default function TableProductos({ openCreate, setOpenCreate }) {
  /*   const data = useSelector((store) => store[dataStore][dataStore]); */
  const dispatch = useDispatch();
  const data = useSelector((store) => store.products.products);
  const [product, setProduct] = useState("");
  const [codigoBarras, setCodigoBarras] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
      field: "categoria",
      headerName: "Rubro",
    },
    {
      field: "agrupamiento",
      headerName: "Agrupamiento",
    },
    {
      field: "prices",
      headerName: "Precio",
    },
    { field: "actions", headerName: "Acciones" },
  ];

  const [producto, setProducto] = useState({});
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

  useEffect(() => {
    dispatch(read_products());
  }, []);

  return (
    <>
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
                      if (column.field == "prices") {
                        return (
                          <TableCell key={colIndex} sx={{ p: 0, pl: 2 }}>
                            {"$ "}
                            {item.prices[0].value &&
                              item.prices[0].value.toFixed(2)}
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
                        <IconButton
                          onClick={() => handleSelected(item, "Edit")}
                        >
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
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No hay datos que mostrar</Typography>
      )}

      <CreateProduct openCreate={openCreate} setOpenCreate={setOpenCreate} />
      <DeleteProduct
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        product={product}
        setProduct={setProduct}
      />

      <EditProduct
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        product={product}
        setProduct={setProduct}
      />
    </>
  );
}
