import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  IconButton, TextField
} from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import './adminFrames.css';
import axios from 'axios';

const AdminEditFrameModal = ({ data, onClose, onEdit, onDelete }) => {

  const [editMode, setEditMode] = useState(false);
const [editedFrame, setEditedFrame] = useState({ ...data });


  useEffect(() => {
    setEditedFrame({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFrame(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(`http://localhost:5001/api/frames/${editedFrame.frameID}`, editedFrame);
      onEdit(); 
      onClose(); 
    } catch (err) {
      console.error("Failed to update frame:", err);
    }
  };
  const {
    name, price, img,
    brand, model, material, shape,
    frameType, lensWidth, lensHeight, bridgeWidth, templeLength
  } = data;

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <Grid container spacing={2} padding={2}>
  
       
          <Grid item xs={12} sm={6}>
            <img src="/images/brevik.webp" alt="Eyeglass" className="item-image" />
          </Grid>
  
       
          <Grid item xs={12} sm={6}>
            {editMode ? (
              <>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={editedFrame.name}
                  onChange={handleChange}
                  margin="dense"
                />
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  value={editedFrame.price}
                  onChange={handleChange}
                  margin="dense"
                />
              </>
            ) : (
              <>
                <Typography variant="h4">{name}</Typography>
                <Typography variant="h6">${parseFloat(price).toFixed(2)}</Typography>
              </>
            )}
  
            <Grid container spacing={2} paddingTop={4}>
              <Grid item>
                {editMode ? (
                  <Button variant="contained" onClick={handleEditSubmit}>Save</Button>
                ) : (
                  <Button variant="outlined" color="primary" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(data.frameID)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
  
        
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Dimensions</Typography>
                {editMode ? (
                  <>
                    <TextField fullWidth name="lensWidth" label="Lens Width" value={editedFrame.lensWidth} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="lensHeight" label="Lens Height" value={editedFrame.lensHeight} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="bridgeWidth" label="Bridge Width" value={editedFrame.bridgeWidth} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="templeLength" label="Temple Length" value={editedFrame.templeLength} onChange={handleChange} margin="dense" />
                  </>
                ) : (
                  <>
                    <Typography><b>Lens Width:</b> {lensWidth}mm</Typography>
                    <Typography><b>Lens Height:</b> {lensHeight}mm</Typography>
                    <Typography><b>Bridge Width:</b> {bridgeWidth}mm</Typography>
                    <Typography><b>Temple Length:</b> {templeLength}mm</Typography>
                  </>
                )}
              </Grid>
  
             
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Specifications</Typography>
                {editMode ? (
                  <>
                    <TextField fullWidth name="brand" label="Brand" value={editedFrame.brand} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="model" label="Model" value={editedFrame.model} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="material" label="Material" value={editedFrame.material} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="shape" label="Shape" value={editedFrame.shape} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="frameType" label="Frame Type" value={editedFrame.frameType} onChange={handleChange} margin="dense" />
                  </>
                ) : (
                  <>
                    <Typography><b>Brand:</b> {brand}</Typography>
                    <Typography><b>Model:</b> {model}</Typography>
                    <Typography><b>Material:</b> {material}</Typography>
                    <Typography><b>Shape:</b> {shape}</Typography>
                    <Typography><b>Frame Type:</b> {frameType}</Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
  
        
        <IconButton className="shifter" onClick={onClose}>
          <CancelPresentationIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </div>
    </div>
  );
  
};

export default AdminEditFrameModal;
