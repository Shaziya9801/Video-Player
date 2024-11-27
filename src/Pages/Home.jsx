import React, { useState, useEffect } from 'react';
import { Button, Input, Typography, Box, Snackbar, Alert, Grid, Card, CardContent, List, ListItem, ListItemText, TextField, IconButton, CardMedia } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addVideo, setViewMode } from '../Redux/slice'; 
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const Home = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isEditingName, setIsEditingName] = useState(false);
  const videos = useSelector((state) => state.videos); 

  const { viewMode } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoName(file.name.split('.').slice(0, -1).join('.'));
      setSnackbarMessage('Video uploaded successfully!');
      setSnackbarSeverity('success');
    } else {
      setVideoFile(null);
      setSnackbarMessage('Please upload a valid video file!');
      setSnackbarSeverity('error');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*',
    maxFiles: 1,
  });

  const handleNameChange = (e) => {
    setVideoName(e.target.value);
  };

  const handleSubmit = () => {
    if (!videoFile) {
      setSnackbarMessage('Please upload a video file!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (!videoName) {
      setSnackbarMessage('Please enter a video name!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    const video = { name: videoName, file: videoFile, thumbnail: `https://via.placeholder.com/150` }; 
    dispatch(addVideo(video));
    setVideoName('');
    setVideoFile(null);
    setSnackbarMessage('Video uploaded successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleToggleView = () => {
    const newViewMode = viewMode === 'list' ? 'grid' : 'list';
    dispatch(setViewMode(newViewMode)); 
  };

  const handleEditName = (index) => {
    setIsEditingName(index);
  };

  const handleSaveName = (index) => {
    dispatch(addVideo({ ...videos[index], name: videoName }));
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setVideoName('');
  };

  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor:"#eeeeee"
      }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload and Play Videos
      </Typography>

      <Box sx={{ 
        display: 'flex',
         justifyContent: 'center',
          marginBottom: '20px' 
        }}>
        <TextField sx={{color:"#fff"}}
          value={videoName}
          onChange={handleNameChange}
          placeholder="Enter video name"
          fullWidth
          label="Video Name"
          variant="outlined"
          disabled={isEditingName !== false}
        />
        {isEditingName !== false ? (
          <>
            <IconButton onClick={() => handleSaveName(isEditingName)}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancelEdit}>
              <ClearIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => handleEditName(false)}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #1976d2',
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: '#fff',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" color="textSecondary">
          Drag & Drop your video here, or click to select
        </Typography>
      </Box>

      <Button style={{ backgroundColor: 'black', color: '#FFF',width:"170px" }}
      variant="contained" color='primary' onClick={handleSubmit}>
        Upload Video
      </Button>

      <Button
        variant="contained" 
        sx={{
          display:"block",
          marginTop: '20px',
          // color:"black",
          backgroundColor:"black"
        }}
        onClick={handleToggleView}
      >
        Toggle {viewMode === 'list' ? 'Grid' : 'List'} View
      </Button>

      <div style={{ marginTop: '20px' }}>
        {viewMode === 'list' ? (
          <List>
            {videos.map((video, index) => (
              <ListItem button key={index} component={Link} to={`/video/${index}`} sx=
              {{ padding: '10px',
                border:"2px solid #666", 
                // backgroundColor:"#"
              }}>
                <Grid container spacing={2} alignItems="center" >
                  <Grid item>
                    <CardMedia
                      component="img"
                      image="https://www.flowsols.com/wp-content/uploads/2021/10/video.jpg"
                      alt={video.name}
                      sx={{ width: 100, height: 100, borderRadius: '8px' }}
                    />
                  </Grid>
                  <Grid item xs sx={{color:"black"}}>
                    <ListItemText primary={video.name} />
                  </Grid>
                  <Grid item>
                    <PlayCircleFilledIcon />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        ) : (
          <Grid container spacing={2}>
            {videos?.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image="https://www.flowsols.com/wp-content/uploads/2021/10/video.jpg"
                    alt={video.name}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                      {video.name}
                    </Typography>
                    <Link to={`/video/${index}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }}>
                        Play Video
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
