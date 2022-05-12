import type { ICTypeSchema, MessageBody } from '@kiltprotocol/sdk-js';

import { Did, Message } from '@kiltprotocol/sdk-js';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React, { useEffect, useMemo, useState } from 'react';

import { ADMIN_ATTESTER_ADDRESS, CTYPE } from '@zkid/app-config/constants';
import {
  useClaim,
  useFullDid,
  useLightDid,
  useLocalStorage,
  useRequestForAttestation
} from '@zkid/react-hooks';

import EquipmentRarity from './components/EquipmentRarity';
import SubmitClaim from './components/SubmitClaim';
import { TUTORIAL_MNEMONIC } from './keys';

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  color: #fff;
  text-align: center;

  > h2 {
    margin-bottom: 12px;
    font-size: 30px;
  }

  > p {
    opacity: 0.8;
  }
`;

const Step2: React.FC = () => {
  const [name, setName] = useState<string>();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [clazz, setClazz] = useState<number>();
  const [rarity, setRarity] = useState<[number, number, number]>();
  const [mnemonic, setMnemonic] = useLocalStorage<string>(TUTORIAL_MNEMONIC);

  const keystore = useMemo(() => new Did.DemoKeystore(), []);
  const lightDid = useLightDid(keystore, mnemonic);

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
  const claim = useClaim(CTYPE as ICTypeSchema, contents, lightDid?.did);
  const requestForAttestation = useRequestForAttestation(keystore, claim, lightDid);

  const attesterFullDid = useFullDid(ADMIN_ATTESTER_ADDRESS);

  const message = useMemo(() => {
    if (requestForAttestation && lightDid && attesterFullDid) {
      const messageBody: MessageBody = {
        content: { requestForAttestation },
        type: Message.BodyType.REQUEST_ATTESTATION
      };

      return new Message(messageBody, lightDid.did, attesterFullDid.did);
    } else {
      return null;
    }
  }, [attesterFullDid, lightDid, requestForAttestation]);

  useEffect(() => {
    if (!mnemonic) {
      setMnemonic(mnemonicGenerate());
    }
  }, [mnemonic, setMnemonic]);

  return (
    <Wrapper>
      <h2>Describe Yourself</h2>
      <p>
        We have prepared a gift POAP for you. The POAP style varies by your age, class and
        equipment. To claim it, first describe yourself. Then submit.
      </p>
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
          <Select
            onChange={(e) => setClazz(Number(e.target.value))}
            value={clazz}
            variant="outlined"
          >
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

        <div style={{ textAlign: 'center' }}>
          <SubmitClaim
            attesterFullDid={attesterFullDid}
            claimLightDid={lightDid}
            keystore={keystore}
            message={message}
          />
        </div>
      </Box>
    </Wrapper>
  );
};

export default React.memo(Step2);
