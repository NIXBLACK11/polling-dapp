use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub total_polls: u8,
}

#[account]
#[derive(Default)]
pub struct PollAccount {
    pub idx: u8,
    pub authority: Pubkey,
    pub description: String,
    pub option1: String,
    pub option1_count: i32,
    pub option2: String,
    pub option2_count: i32,
    pub winner: i8,
    pub end_time: i64,
    pub voters: Vec<Pubkey>,  
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PollData {
    pub idx: u8,
    pub authority: Pubkey,
    pub description: String,
    pub option1: String,
    pub option1_count: i32,
    pub option2: String,
    pub option2_count: i32,
    pub winner: i8,
    pub end_time: i64,
}