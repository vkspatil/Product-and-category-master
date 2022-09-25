import react, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
  TablePagination,
  TableContainer,
  Paper,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers, deleteUser } from "../Service/api";
import { Link } from "react-router-dom";

import { Box } from "@mui/system";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
  background: #fffde7;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #9e9d24;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AllProduct = () => {
  const [users, setUsers] = useState([]);
  const [dense, setDense] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const searchItem = users.filter((user) => {
    if (search == "") {
      return user;
    } else if (
      user.title.toLowerCase().includes(search.toLowerCase()) ||
      user.category.toLowerCase().includes(search.toLowerCase())
    ) {
      return user;
    }
  });

  return (
    <>
      <Paper
        component="form"
        sx={{
          m: "30px auto 15px",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <Box type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </Box>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Data"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </Paper>
      <Paper sx={{ width: "80%", overflow: "hidden",m:"10px auto 10px" }}>
        <TableContainer sx={{ maxHeight: 440,m:"10px auto 10px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <THead>
                <TableCell align="center">Product Id</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </THead>
            </TableHead>
            <TableBody>
              {searchItem
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index,id) => {
                  return (
                    <TRow hover role="checkbox" key={index}>
                      <TableCell align="center">{user._id}</TableCell>{" "}
                      {/* change it to user.id to use JSON Server */}
                      <TableCell align="center">{user.title}</TableCell>
                      <TableCell align="center">{user.category}</TableCell>
                      <TableCell align="center">{user.price}</TableCell>
                      <TableCell align="center">{user.description}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          variant="contained"
                          sx={{
                            margin: "5px",
                            textAlign: "center",
                            fontWeight: "bold",
                            borderRadius: "10px",
                            width: "60px",
                          }}
                          component={Link}
                          to={`/edit/${user._id}`}
                        >
                          <EditOutlinedIcon sx={{fontSize:"30px"}}/>
                        </IconButton>{" "}
                        {/* change it to user.id to use JSON Server */}
                        <IconButton
                          color="error"
                          variant="contained"
                          sx={{
                            margin: "5px",
                            textAlign: "center",
                            fontWeight: "bold",
                            borderRadius: "10px",
                            width: "60px",
                          }}
                          onClick={() => deleteUserData(user._id)}
                        >
                          <DeleteForeverOutlinedIcon sx={{fontSize:"30px"}}/>
                        </IconButton>{" "}
                        {/* change it to user.id to use JSON Server */}
                      </TableCell>
                    </TRow>
                  );
                })}
              {emptyRows > 0 && (
                <TRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default AllProduct;
