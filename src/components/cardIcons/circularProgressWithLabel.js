import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  function colorForValue(value) {
    switch (Math.floor(value/10)) {
      case 0: case 1: case 2: case 3:
        return '#D72360';
      case 4: case 5: case 6:
        return '#CFD63A';
      case 7: case 8: case 9:
        return '#31D17C';
      default:
        return 'success'
    }
  }
  return (
    <Box sx={{
      position: 'relative', 
      display: 'inline-flex',
      top: '-40px', 
      background: '#0A1C22',
      borderRadius: '30px',
      }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: colorForValue(props.value),
          opacity: 0.3,
        }}
        size={50}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress variant="determinate" {...props} 
        sx={{
          color: colorForValue(props.value),
          position: 'absolute',
          left: 0,
        }}
        size={50}
        thickness={4}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white" sx = {{
          fontSize: '1.1rem'
        }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default CircularProgressWithLabel;