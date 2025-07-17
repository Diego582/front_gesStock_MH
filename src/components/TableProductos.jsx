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
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Box
          sx={{
            overflowX: isMobile ? "auto" : "unset",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <TableContainer
            sx={{
              maxHeight: "65vh",
              overflowY: "auto",
              minWidth: isMobile ? "600px" : "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((col, i) => (
                    <TableCell key={i} sx={{ fontWeight: "bold", p: 2 }}>
                      {col.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgba(157, 85, 82, 0.05)" : "white",
                    }}
                  >
                    {columns.map((col, j) => {
                      if (col.field === "prices") {
                        return (
                          <TableCell key={j} sx={{ p: 1 }}>
                            ${" "}
                            {item.prices?.[0]?.value
                              ? item.prices[0].value.toFixed(2)
                              : "-"}
                          </TableCell>
                        );
                      }
                      if (col.field === "actions") {
                        return (
                          <TableCell key={j}>
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
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={j} sx={{ p: 1 }}>
                          {item[col.field]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No hay datos que mostrar.
        </Typography>
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
