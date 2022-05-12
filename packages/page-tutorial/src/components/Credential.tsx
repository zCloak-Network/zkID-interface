import type { IMessage } from '@kiltprotocol/sdk-js';

import { Box, styled } from '@mui/material';
import React from 'react';

interface Props {
  credential?: IMessage;
}

const Wrapper = styled(Box)`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 476px;
  height: 254px;
  padding: 28px;
  margin-bottom: 44px;

  background: url('/images/bg_credential.webp') no-repeat;
  background-size: cover;
  background-position: center;

  text-align: left;

  > img {
    user-select: none;
  }

  > img:nth-of-type(1) {
    width: 196px;
    height: 196px;
    margin-right: 30px;
  }

  > img:nth-of-type(2) {
    position: absolute;
    left: 170px;
    bottom: 26px;
    width: 106px;
    height: 106px;
  }

  .detail {
    flex: 1;
  }

  .detial-item + .detial-item {
    margin-top: 14px;
  }

  .detial-item {
    display: flex;
    justify-content: space-between;

    .label {
      font-size: 14px;
      font-family: RobotoSlab;
      line-height: 17px;
      color: #000000;
      font-weight: 700;
    }

    .value {
      font-size: 13px;
      font-family: Roboto;
      line-height: 16px;
      color: #000000;
      opacity: 1;
    }
  }

  .name-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .value {
      font-size: 22px;
      font-family: Roboto;
      line-height: 26px;
      color: #000000;
      margin-left: 16px;
      font-weight: bold;
    }
  }
`;

const Credential: React.FC<Props> = ({ credential }) => {
  const name = (credential?.body.content as unknown as any)?.request?.claim?.contents?.name;
  const age = (credential?.body.content as unknown as any)?.request?.claim?.contents?.age;
  const clazz = (credential?.body.content as unknown as any)?.request?.claim?.contents?.class;
  const helmet = (credential?.body.content as unknown as any)?.request?.claim?.contents
    ?.helmet_rarity;
  const weapon = (credential?.body.content as unknown as any)?.request?.claim?.contents
    ?.weapon_rarity;
  const chest = (credential?.body.content as unknown as any)?.request?.claim?.contents
    ?.chest_rarity;

  const ClazzName: Record<number, string> = {
    1: 'Warrior',
    2: 'Paladin',
    3: 'Priest',
    4: 'Mage'
  };

  return (
    <Wrapper>
      <img src={require('./avatar.webp')} />
      <img src={require('./attested.webp')} />
      <div className="detail">
        <div className="detial-item name-item">
          <span className="label">Name:</span>
          <span className="value">{name}</span>
        </div>
        <div className="detial-item">
          <span className="label">Age:</span>
          <span className="value">{age}</span>
        </div>
        <div className="detial-item">
          <span className="label">Class:</span>
          <span className="value">{ClazzName[clazz as unknown as number]}</span>
        </div>
        <div className="detial-item">
          <span className="label">Helmet:</span>
          <span className="value">{helmet}</span>
        </div>
        <div className="detial-item">
          <span className="label">Chest:</span>
          <span className="value">{chest}</span>
        </div>
        <div className="detial-item">
          <span className="label">Weapon:</span>
          <span className="value">{weapon}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(Credential);
