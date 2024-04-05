import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


// function Item(props) {
//   const { sx, ...other } = props;
//   return (
//     <Box
//       sx={{
//         p: 1,
//         m: 1,
//         bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
//         color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
//         border: '1px solid',
//         borderColor: (theme) =>
//           theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
//         borderRadius: 2,
//         fontSize: '0.875rem',
//         fontWeight: '700',
//         ...sx,
//       }}
//       {...other}
//     />
//   );
// }




export default function Homepage() {
  const [users, setUser] = useState([]);
  // const [deleteOpen, setDeleteOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await axios.get('http://68.183.230.164:3000/users/list')
        setUser(reponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://68.183.230.164:3000/users/delete/${id}`);
      console.log('User deleted successfully:', response.data);
      setUser(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.response.data.message);
    }
  };
  
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://68.183.230.164:3000/users/update/${editingUser._id}`, editingUser);
      const updatedUsers = users.map(user => (user._id === editingUser._id ? editingUser : user));
      setUser(updatedUsers);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setEditingUser({ ...editingUser, role: e.target.value });
  };
  
  

  return (
    <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>Users</Box>
        <Link to='/Create'><Button variant="contained" startIcon={<AddIcon/>}>CREATE</Button></Link>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>email</TableCell>
            <TableCell>username</TableCell>
            <TableCell>password</TableCell>
            <TableCell>role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user._id}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                {/* <Box>
                  <Avatar src={user.avatar} />
              </Box> */}
                {user.password}
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="outlined" startIcon={<DeleteIcon />} style={{marginRight:'0.1rem'}} onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
                <Button variant="contained" endIcon={<EditIcon />} onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingUser && (
        <Box mt={2}>
          <Paper variant="outlined" elevation={3} sx={{ p: 2 }}>
            <TextField name="name" label="Name" style={{margin:'0.3rem'}} value={editingUser.name} onChange={handleChange} fullWidth />
            <TextField name="email" label="Email" style={{margin:'0.3rem'}} value={editingUser.email} onChange={handleChange} fullWidth />
            <TextField name="username" label="Username" style={{margin:'0.3rem'}} value={editingUser.username} onChange={handleChange} fullWidth />
            <TextField name="password" label="Password" style={{margin:'0.3rem'}} value={editingUser.password} onChange={handleChange} fullWidth />
            {/* <TextField name="role" label="Role" style={{margin:'0.3rem'}} value={editingUser.role} onChange={handleChange} fullWidth /> */}
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editingUser.role}
          label="Age"
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="admin">admin</MenuItem>
          <MenuItem value="employee">employee</MenuItem>
          <MenuItem value="manager">manager</MenuItem>
        </Select>
            <Box mt={2} textAlign="right">
              <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            </Box>
          </Paper>
        </Box>
      )}
    </TableContainer>

  )
}
