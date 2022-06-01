import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useMemo, useState } from 'react';

import { StayAlert } from '@zkid/react-components';

import EquipmentRarity from './EquipmentRarity';
import SubmitClaim from './SubmitClaim';

const MAX_DATE = new Date();

class FormError extends Error {
  public position: 0 | 1 | 2 | 3;

  constructor(position: 0 | 1 | 2 | 3, message?: string) {
    super(message);
    this.position = position;
  }
}

const Contents: React.FC = () => {
  const [name, setName] = useState<string>();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [clazz, setClazz] = useState<number>();
  const [rarity, setRarity] = useState<[number, number, number]>();
  const [error, setError] = useState<Error | null>(null);
  const formError = useMemo(() => {
    if (birthday && (!birthday.getTime() || birthday.getTime() > Date.now())) {
      return new FormError(1, 'Invalid birthday date');
    }

    return null;
  }, [birthday]);

  return (
    <>
      <StayAlert
        message={formError?.message ?? error?.message}
        open={!!formError || !!error}
        severity="error"
      />
      <Box
        autoComplete="off"
        component="form"
        noValidate
        sx={{
          width: '100%',
          textAlign: 'left',

          '> .MuiFormControl-root': {
            mb: 2
          }
        }}
      >
        <FormControl error={!!formError && formError.position === 0} fullWidth variant="outlined">
          <InputLabel shrink>Name</InputLabel>
          <OutlinedInput
            onChange={(e) => setName(e.target.value)}
            placeholder="Please input name"
          />
          {!!formError && formError.position === 0 && (
            <FormHelperText>{formError.message}</FormHelperText>
          )}
        </FormControl>
        <DatePicker
          maxDate={MAX_DATE}
          onChange={setBirthday}
          renderInput={(params) => (
            <FormControl
              error={!!formError && formError.position === 1}
              fullWidth
              variant="outlined"
            >
              <InputLabel shrink>Birthday</InputLabel>
              <OutlinedInput
                endAdornment={params.InputProps?.endAdornment}
                inputProps={params.inputProps}
                ref={params.inputRef}
              />
              {!!formError && formError.position === 1 && (
                <FormHelperText>{formError.message}</FormHelperText>
              )}
            </FormControl>
          )}
          value={birthday}
        />
        <FormControl fullWidth>
          <InputLabel shrink>Class</InputLabel>
          <Select onChange={(e) => setClazz(Number(e.target.value))} variant="outlined">
            <MenuItem value={1}>Warrior</MenuItem>
            <MenuItem value={2}>Paladin</MenuItem>
            <MenuItem value={3}>Priest</MenuItem>
            <MenuItem value={4}>Mage</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel shrink>Equipment Rarity</InputLabel>
          <EquipmentRarity onChange={setRarity} />
        </FormControl>
        <Box sx={{ textAlign: 'center' }}>
          <SubmitClaim contents={{ name, birthday, class: clazz, rarity }} reportError={setError} />
        </Box>
      </Box>
    </>
  );
};

export default React.memo<typeof Contents>(Contents);
