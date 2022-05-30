import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useEffect, useMemo, useState } from 'react';

import EquipmentRarity from './EquipmentRarity';

interface Props {
  contentsChange?: (contents: any) => void;
}

const MAX_DATE = new Date();

const Contents: React.FC<Props> = ({ contentsChange }) => {
  const [name, setName] = useState<string>();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [clazz, setClazz] = useState<number>();
  const [rarity, setRarity] = useState<[number, number, number]>();

  const contents = useMemo(() => {
    return name && clazz && rarity && birthday
      ? {
          name,
          class: clazz,
          age: new Date().getFullYear() - birthday.getFullYear(),
          helmet_rarity: rarity[0],
          chest_rarity: rarity[1],
          weapon_rarity: rarity[2]
        }
      : undefined;
  }, [birthday, clazz, name, rarity]);

  useEffect(() => {
    contentsChange?.(contents);
  }, [contents, contentsChange]);

  return (
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
      <FormControl fullWidth variant="outlined">
        <InputLabel shrink>Name</InputLabel>
        <OutlinedInput
          onChange={(e) => setName(e.target.value)}
          placeholder="Please input name"
          value={name}
        />
      </FormControl>
      <DatePicker
        maxDate={MAX_DATE}
        onChange={setBirthday}
        renderInput={(params) => (
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Birthday</InputLabel>
            <OutlinedInput
              endAdornment={params.InputProps?.endAdornment}
              inputProps={params.inputProps}
              ref={params.inputRef}
            />
          </FormControl>
        )}
        value={birthday}
      />
      <FormControl fullWidth>
        <InputLabel shrink>Class</InputLabel>
        <Select onChange={(e) => setClazz(Number(e.target.value))} value={clazz} variant="outlined">
          <MenuItem value={1}>Warrior</MenuItem>
          <MenuItem value={2}>Paladin</MenuItem>
          <MenuItem value={3}>Priest</MenuItem>
          <MenuItem value={4}>Mage</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel shrink>Equipment Rarity</InputLabel>
        <EquipmentRarity onChange={setRarity} value={rarity} />
      </FormControl>
    </Box>
  );
};

export default React.memo<typeof Contents>(Contents);
