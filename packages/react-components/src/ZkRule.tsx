import { Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import AceEditor from 'react-ace';

import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';

import DialogHeader from './DialogHeader';

require('ace-builds/src-noconflict/mode-java');
require('ace-builds/src-noconflict/theme-terminal');
require('ace-builds/src-noconflict/ext-language_tools');

interface Props {
  open: boolean;
  onClose: () => void;
}

const Content = styled(DialogContent)`
  text-align: left;
  .content-title {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #333333;
    margin-bottom: 8px;
  }

  .content-title {
    margin-top: 24px;
  }

  .table {
    width: 100%;
    font-size: 12px;
    font-weight: 300;
    color: #000000;
    text-align: center;
    background: #f7f8fa;
    border: 1px solid #999999;
    opacity: 1;
    border-radius: 4px;
    border-spacing: 0;
    border-collapse: separate;

    tr {
      height: 36px;
    }
    .table-header {
      font-weight: 400;
    }

    tr,
    th {
      border-bottom: 1px solid #999999;
    }
    td,
    th {
      border-right: 1px solid #999999;
      border-bottom: 1px solid #999999;
      padding: 8px;
      vertical-align: middle;
    }
    tr td:last-child,
    tr th:last-child {
      border-right: 0;
    }
    tr:last-child td {
      border-bottom: 0;
    }
  }

  .program-code {
    width: 100% !important;
    height: 340px !important;
    background: #272823;
    opacity: 1;
    border-radius: 20px;
    overflow-y: auto;
    font-size: 14px !important;
    font-weight: 300;
    color: #ffffff;
    padding: 18px 32px;
  }
`;

const RuleModal: React.FC<Props> = ({ onClose, open }) => {
  return (
    <Dialog maxWidth="lg" onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>POAP Issuance Rule</DialogHeader>
      <Content>
        <p className="content-title">
          The POAP classification and other calculation rules are as follows:
        </p>
        <table className="table">
          <tr className="table-header">
            <th>class</th>
            <th>Damage Type</th>
            <th>Age</th>
            <th>POAP</th>
          </tr>
          <tr>
            <td rowSpan={2}>{'Warrior & Paladin'}</td>
            <td rowSpan={2}>Physical Damage</td>
            <td>{'Age < 18'}</td>
            <td>Hold a Shield</td>
          </tr>
          <tr>
            <td>Age ≥ 18</td>
            <td>Hold a Sword</td>
          </tr>
          <tr>
            <td rowSpan={2}>{'Priest & Mage'}</td>
            <td rowSpan={2}>Magical Damage</td>
            <td>{'Age < 18'}</td>
            <td>Hold a Spellbook</td>
          </tr>
          <tr>
            <td>Age ≥ 18</td>
            <td>Hold a Wand</td>
          </tr>
          <tr>
            <td colSpan={4}>
              P.s. If the average of all equipment rarities is over 6, the Adventurer‘s POAP will be
              gold-edged.
            </td>
          </tr>
        </table>
        <p className="content-title">Features:</p>
        <p>1. Range Check—to check whether the Adventurer’s age is over 18.</p>
        <p>
          2. Membership Check—to check whether the class belongs to Physical/Magical Damage group.
        </p>
        <p>3. Rarity calculation—to compute the average of all equipment rarities.</p>
        <p className="content-title">Program Hash</p>
        <p>{ZK_PROGRAM.hash}</p>
        <p className="content-title">zkVM Program Code</p>
        <AceEditor
          className="program-code"
          editorProps={{ $blockScrolling: true }}
          mode="javascript"
          name="UNIQUE_ID_OF_DIV"
          theme="terminal"
          value={ZK_PROGRAM.detail}
        />
      </Content>
    </Dialog>
  );
};

export default RuleModal;
