import { useState, useEffect } from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Tooltip,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "../Service/api";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const initialValue = {
  title: "",
  category: "",
  price: "",
  description: "",
};
const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin: 20px;
  }
  border: 4px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const EditProduct = () => {
  const [user, setUser] = useState(initialValue);
  const { title, category, price, description } = user;
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
  };

  const editUserDetails = async () => {
    const response = await editUser(id, user);
    navigate("/all");
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container injectFirst>
      <Typography
        variant="h4"
        sx={{
          margin: "20px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#ce93d8",
          backgroundColor: "##c5cae9",
          border: "2px solid ",
          borderRadius: "10px",
        }}
      >
        Edit Information
      </Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="title"
          value={title}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="my-input">Category</InputLabel>
        <Select
          onChange={(e) => onValueChange(e)}
          name="category"
          value={category}
          id="my-input"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"mobiles"}>Mobile</MenuItem>
          <MenuItem value={"appliances"}>Appliances</MenuItem>
          <MenuItem value={"clothes"}>Clothes</MenuItem>
          <MenuItem value={"shoes"}>Shoes</MenuItem>
          <MenuItem value={"grocery"}>Grocery</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Price</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="price"
          value={price}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={description}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
     
        <Button
          variant="contained"
          onClick={() => editUserDetails()}
          
          sx={{
            margin: "20px",
            textAlign: "center",
            fontWeight: "bold",
            borderRadius: "10px",
            backgroundColor: "#0063cc",
            borderColor: "#0063cc",
          }}
        >
          <Tooltip title="Add to list" placement="top">
            <IconButton>
              <EditOutlinedIcon sx={{ color: "#e8f5e9", fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditProduct;
