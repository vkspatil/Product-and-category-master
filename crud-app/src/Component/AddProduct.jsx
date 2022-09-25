import { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { addUser } from "../Service/api";
import { useNavigate } from "react-router-dom";
import AddTaskIcon from "@mui/icons-material/AddTask";

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

const AddUser = () => {
  
  const [user, setUser] = useState(initialValue);
  const { title, category, price, description } = user;
  const [categ,setcatag]=useState([])
  let navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name ]: ( e.target.value)});
   };

  const addUserDetails = async () => {
    await addUser(user);
    navigate("/all");
    console.log(user.category.id);
  };


  const Categories=[
    {id:'1', name:'mobiles'},
    {id:'2', name:'appliances'},
    {id:'3', name:'clothes'},
    {id:'4', name:'shoes'},
    {id:'5', name:'grocery'}
  ];
  useEffect(() => {
    setcatag(Categories)
  }, [])
  



  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          margin: "20px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#4caf50",
          backgroundColor: "##c5cae9",
          border: "2px solid ",
          borderRadius: "10px",
        }}
      >
        Add Product
      </Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="title"
          value={title}
          id="my-input"
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
          {categ && categ !== undefined ? 
          categ.map((ctr,index)=>{return (
            <MenuItem key={index} value={ctr.name}>{ctr.name}</MenuItem>
          )}) : "no category" }


        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Price</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="price"
          value={price}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={description}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="success"
          onClick={() => addUserDetails()}
          sx={{
            margin: "20px",
            textAlign: "center",
            fontWeight: "bold",
            borderRadius: "10px",
            p: 0,
          }}
        >
          <Tooltip title="Add to list" placement="top">
            <IconButton>
              <AddTaskIcon sx={{ color: "#e8f5e9", fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
