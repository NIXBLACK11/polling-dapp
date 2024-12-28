/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/polling_app.json`.
 */
export type PollingApp = {
  "address": "AJ6SR4vdRH2XjmdSsKehLZiJhzwuvLvcip99GrJiaQem",
  "metadata": {
    "name": "pollingApp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "fetchPoll",
      "discriminator": [
        175,
        171,
        103,
        75,
        206,
        178,
        176,
        67
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "pollAccount"
          ]
        },
        {
          "name": "pollAccount"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pollIdx",
          "type": "u8"
        }
      ],
      "returns": {
        "defined": {
          "name": "pollData"
        }
      }
    },
    {
      "name": "initializeUser",
      "discriminator": [
        111,
        17,
        185,
        250,
        60,
        122,
        38,
        254
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  85,
                  83,
                  69,
                  82,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "makePoll",
      "discriminator": [
        186,
        92,
        217,
        70,
        105,
        29,
        165,
        130
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "userProfile"
          ]
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  85,
                  83,
                  69,
                  82,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "pollAccount",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "name": "removePoll",
      "discriminator": [
        127,
        237,
        78,
        34,
        55,
        84,
        172,
        225
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "userProfile",
            "pollAccount"
          ]
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  85,
                  83,
                  69,
                  82,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "pollAccount",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
      "name": "selectOption",
      "discriminator": [
        54,
        244,
        147,
        218,
        87,
        94,
        100,
        187
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "pollAccount"
          ]
        },
        {
          "name": "pollAccount",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
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
    }
  ],
  "accounts": [
    {
      "name": "pollAccount",
      "discriminator": [
        109,
        254,
        117,
        41,
        232,
        74,
        172,
        45
      ]
    },
    {
      "name": "userProfile",
      "discriminator": [
        32,
        37,
        119,
        205,
        179,
        180,
        13,
        194
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "notAllowed",
      "msg": "Not allowed"
    },
    {
      "code": 6002,
      "name": "mathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6003,
      "name": "alreadyVoted",
      "msg": "Already voted"
    },
    {
      "code": 6004,
      "name": "pollOver",
      "msg": "Poll over"
    }
  ],
  "types": [
    {
      "name": "pollAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idx",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "pubkey"
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
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "pollData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "idx",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "pubkey"
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
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "totalPolls",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "pollTag",
      "type": "bytes",
      "value": "[80, 79, 76, 76, 95, 83, 84, 65, 84, 69]"
    },
    {
      "name": "userTag",
      "type": "bytes",
      "value": "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]"
    }
  ]
};
