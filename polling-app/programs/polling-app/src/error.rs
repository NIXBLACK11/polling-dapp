use anchor_lang::prelude::*;

#[error_code]
pub enum PollError {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
    #[msg("Not allowed")]
    NotAllowed,
    #[msg("Math operation overflow")]
    MathOverflow,
    #[msg("Already voted")]
    AlreadyVoted,
    #[msg("Poll over")]
    PollOver,
}