export type Polling = {
    "version": "0.1.0",
    "name": "polling_app",
    "constants": [
      {
        "name": "USER_TAG",
        "type": "bytes",
        "value": "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]"
      },
      {
        "name": "POLL_TAG",
        "type": "bytes",
        "value": "[80, 79, 76, 76, 95, 83, 84, 65, 84, 69]"
      }
    ],
    "instructions": [
      {
        "name": "initializeUser",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "userProfile",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "makePoll",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "userProfile",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "pollAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "option1",
            "type": "string"
          },
          {
            "name": "option2",
            "type": "string"
          },
          {
            "name": "endTime",
            "type": "i64"
          }
        ]
      },
      {
        "name": "selectOption",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "pollAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "pollIdx",
            "type": "u8"
          },
          {
            "name": "option",
            "type": "u8"
          }
        ]
      },
      {
        "name": "removePoll",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "userProfile",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "pollAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "pollIdx",
            "type": "u8"
          }
        ]
      },
      {
        "name": "fetchPoll",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "pollAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "pollIdx",
            "type": "u8"
          }
        ],
        "returns": {
          "defined": "PollData"
        }
      }
    ],
    "accounts": [
      {
        "name": "UserProfile",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "totalPolls",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "PollAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "idx",
              "type": "u8"
            },
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "option1",
              "type": "string"
            },
            {
              "name": "option1Count",
              "type": "i32"
            },
            {
              "name": "option2",
              "type": "string"
            },
            {
              "name": "option2Count",
              "type": "i32"
            },
            {
              "name": "winner",
              "type": "i8"
            },
            {
              "name": "endTime",
              "type": "i64"
            },
            {
              "name": "voters",
              "type": {
                "vec": "publicKey"
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "PollData",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "idx",
              "type": "u8"
            },
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "option1",
              "type": "string"
            },
            {
              "name": "option1Count",
              "type": "i32"
            },
            {
              "name": "option2",
              "type": "string"
            },
            {
              "name": "option2Count",
              "type": "i32"
            },
            {
              "name": "winner",
              "type": "i8"
            },
            {
              "name": "endTime",
              "type": "i64"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "Unauthorized",
        "msg": "You are not authorized to perform this action."
      },
      {
        "code": 6001,
        "name": "NotAllowed",
        "msg": "Not allowed"
      },
      {
        "code": 6002,
        "name": "MathOverflow",
        "msg": "Math operation overflow"
      },
      {
        "code": 6003,
        "name": "AlreadyVoted",
        "msg": "Already voted"
      },
      {
        "code": 6004,
        "name": "PollOver",
        "msg": "Poll over"
      }
    ]
};

export const IDL: Polling = {
  "version": "0.1.0",
  "name": "polling_app",
  "constants": [
    {
      "name": "USER_TAG",
      "type": "bytes",
      "value": "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]"
    },
    {
      "name": "POLL_TAG",
      "type": "bytes",
      "value": "[80, 79, 76, 76, 95, 83, 84, 65, 84, 69]"
    }
  ],
  "instructions": [
    {
      "name": "initializeUser",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "makePoll",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pollAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "option1",
          "type": "string"
        },
        {
          "name": "option2",
          "type": "string"
        },
        {
          "name": "endTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "selectOption",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pollAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "pollIdx",
          "type": "u8"
        },
        {
          "name": "option",
          "type": "u8"
        }
      ]
    },
    {
      "name": "removePoll",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pollAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "pollIdx",
          "type": "u8"
        }
      ]
    },
    {
      "name": "fetchPoll",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pollAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "pollIdx",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": "PollData"
      }
    }
  ],
  "accounts": [
    {
      "name": "UserProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "totalPolls",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PollAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idx",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "option1",
            "type": "string"
          },
          {
            "name": "option1Count",
            "type": "i32"
          },
          {
            "name": "option2",
            "type": "string"
          },
          {
            "name": "option2Count",
            "type": "i32"
          },
          {
            "name": "winner",
            "type": "i8"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "voters",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PollData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idx",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "option1",
            "type": "string"
          },
          {
            "name": "option1Count",
            "type": "i32"
          },
          {
            "name": "option2",
            "type": "string"
          },
          {
            "name": "option2Count",
            "type": "i32"
          },
          {
            "name": "winner",
            "type": "i8"
          },
          {
            "name": "endTime",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "NotAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6003,
      "name": "AlreadyVoted",
      "msg": "Already voted"
    },
    {
      "code": 6004,
      "name": "PollOver",
      "msg": "Poll over"
    }
  ]
};