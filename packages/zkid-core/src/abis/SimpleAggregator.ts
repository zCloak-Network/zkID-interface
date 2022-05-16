export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_registry',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'cOwner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'requestHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'outputHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isPassed',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint128[]',
        name: 'calcOutput',
        type: 'uint128[]'
      }
    ],
    name: 'Canonical',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'authority',
        type: 'address'
      }
    ],
    name: 'LogSetAuthority',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'LogSetOwner',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'cOwner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'requestHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'worker',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'outputHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'rootHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'attester',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isPassed',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint128[]',
        name: 'calcResult',
        type: 'uint128[]'
      }
    ],
    name: 'Verifying',
    type: 'event'
  },
  {
    inputs: [],
    name: 'CONTRACT_AGGREGATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'CONTRACT_MAIN_KILT',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'CONTRACT_POAP_FACTORY',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'CONTRACT_READ_GATEWAY',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'CONTRACT_REPUTATION',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'CONTRACT_REQUEST',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'CONTRACT_REWARD',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'UINT32_MIN_COMMIT',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'UINT32_THRESHOLD',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'authority',
    outputs: [
      {
        internalType: 'contract IAuthority',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_requestHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: '_cType',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: '_attester',
        type: 'bytes32'
      }
    ],
    name: 'checkAttestation',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cOwner',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_requestHash',
        type: 'bytes32'
      }
    ],
    name: 'clear',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_rootHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint128[]',
        name: '_calcOutput',
        type: 'uint128[]'
      },
      {
        internalType: 'bool',
        name: '_isPassed',
        type: 'bool'
      },
      {
        internalType: 'bytes32',
        name: '_attester',
        type: 'bytes32'
      }
    ],
    name: 'getOutputHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'oHash',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_keeper',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_cOwner',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_requestHash',
        type: 'bytes32'
      }
    ],
    name: 'hasSubmitted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cOwner',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_requestHash',
        type: 'bytes32'
      }
    ],
    name: 'isFinished',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'registry',
    outputs: [
      {
        internalType: 'contract IRegistry',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_authority',
        type: 'address'
      }
    ],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address'
      }
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cOwner',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_requestHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: '_cType',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: '_rootHash',
        type: 'bytes32'
      },
      {
        internalType: 'bool',
        name: '_verifyRes',
        type: 'bool'
      },
      {
        internalType: 'bytes32',
        name: '_attester',
        type: 'bytes32'
      },
      {
        internalType: 'uint128[]',
        name: '_calcOutput',
        type: 'uint128[]'
      }
    ],
    name: 'submit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_who',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_requestHash',
        type: 'bytes32'
      }
    ],
    name: 'zkID',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      },
      {
        internalType: 'uint128[]',
        name: '',
        type: 'uint128[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
