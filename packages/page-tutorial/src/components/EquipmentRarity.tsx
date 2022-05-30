import { Box, Button, styled } from '@mui/material';
import React, { useCallback, useState } from 'react';

interface Props {
  onChange?: (value: [number, number, number]) => void;
}

const Wrapper = styled(Box)`
  border-radius: 10px;
  margin-bottom: 44px;
  padding: 20px 20px 16px;
  width: 100%;

  color: #666;
  font-size: 16px;
  line-height: 24px;

  background: hsla(0, 0%, 100%, 0.5);
  border: 1px solid hsla(0, 0%, 100%, 0.6);
  text-align: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  > .MuiButton-root {
    margin-top: 40px;
  }
`;

function random(min = 1, max = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const EquipmentRarity: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState<[number, number, number]>();
  const toggleRandom = useCallback(() => {
    const v: [number, number, number] = [random(), random(), random()];

    setValue(v);
    onChange?.(v);
  }, [onChange]);

  return (
    <Wrapper>
      <div>
        Helmet: <span>{value ? value[0] : '1- 10'}</span>
      </div>
      <div>
        Chest: <span>{value ? value[1] : '1- 10'}</span>
      </div>
      <div>
        Weapon: <span>{value ? value[2] : '1- 10'}</span>
      </div>

      <Button onClick={toggleRandom} variant="outlined">
        Random
      </Button>
    </Wrapper>
  );
};

export default React.memo(EquipmentRarity);
