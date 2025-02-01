import {useEffect, useState} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';


function ChooseDateComponent({customTextFieldStyles, setDoB}) {
    const [value,setValue] = useState(null);
    
    useEffect(() => {
      if (value) {
        const day = value.date(); 
        const month = value.month() + 1;
        const year = value.year(); 
        setDoB(`${day}/${month}/${year}`);
      }
    }, [value, setDoB]);
    

  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker
        label="Date of Birth" // Add label
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined" // Outlined style
            fullWidth // Optional: Make the field full width
          />
        )}
        sx={customTextFieldStyles}
        className='text-[#fff] w-[16rem]'
      />
      </LocalizationProvider>
    </div>
  )
}

export default ChooseDateComponent;
