import React from 'react'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { DateTimePicker, TimePicker, DatePicker } from '@mui/lab'

function CustomInput(props) {
  return (
    <div>
      {props.type === 'select' ? (
        <FormControl fullWidth={props.fullWidth} sx={props.sx || { marginTop: 3, minWidth: 120 }}>
          <InputLabel id={props.keys || Math.random().toString()} size={props.size || 'small'}>
            {props.label}
          </InputLabel>
          <Select
            size={props.size || 'medium'}
            fullWidth={props.fullWidth}
            sx={{ minWidth: 120 }}
            id={props.keys || Math.random().toString()}
            value={props.value}
            onChange={(e, n = '') => props.onChange(n, e.target.value)}
            label={props.label}
            style={props.style}
          >
            {props.items.map((item) => (
              <MenuItem value={item.value} key={Math.random()}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : props.type === 'date' ? (
        <DatePicker
          style={props.style}
          label={props.label}
          ampm={false}
          value={props.value}
          onChange={(e, n = '') => props.onChange(n, e)}
          renderInput={(params) => <TextField sx={props.sx || { marginTop: 3 }} fullWidth size="small" {...params} />}
          minDateTime={props.minDateTime ?? props.minDateTime}
          maxDateTime={props.maxDateTime ?? props.maxDateTime}
        />
      ) : props.type === 'time' ? (
        <TimePicker
          style={props.style}
          label={props.label}
          ampm={false}
          value={props.value}
          onChange={(e, n = '') => props.onChange(n, e)}
          renderInput={(params) => (
            <TextField sx={props.sx || { marginTop: 3 }} fullWidth size={props.size || 'small'} {...params} />
          )}
          minDateTime={props.minDateTime ?? props.minDateTime}
          maxDateTime={props.maxDateTime ?? props.maxDateTime}
        />
      ) : props.type === 'datetimeOffset' ? (
        <DateTimePicker
          style={{ marginTop: 3 }}
          label={props.label}
          ampm={false}
          value={props.value}
          onChange={(e, n = '') => props.onChange(n, e)}
          renderInput={(params) => (
            <TextField sx={props.sx || { marginTop: 3 }} fullWidth size={props.size || 'small'} {...params} />
          )}
          minDateTime={props.minDateTime ?? props.minDateTime}
          maxDateTime={props.maxDateTime ?? props.maxDateTime}
          disableIgnoringDatePartForTimeValidation
          inputFormat="dd.MM.yyyy hh:mm"
          placeholder="dd.MM.yyyy hh:mm"
          mask="__.__.____ __:__"
        />
      ) : props.type === 'auto' ? (
        <Autocomplete
          disablePortal
          size={props.size || 'small'}
          options={props.options}
          value={props.value}
          getOptionLabel={props.getOptionLabel}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => {
            return <TextField size={props.size || 'small'} sx={props.sx || { marginTop: 3 }} {...params} label={props.label} />
          }}
          onChange={props.onChange}
        />
      ) : (
        <TextField
          type={props.type}
          size="small"
          label={props.label}
          variant="outlined"
          fullWidth={props.fullWidth}
          value={props.value}
          error={props.error}
          sx={props.sx || { marginTop: 3 }}
          onChange={(e, n = '') => props.onChange(n, e.target.value)}
        />
      )}
    </div>
  )
}

export default CustomInput
