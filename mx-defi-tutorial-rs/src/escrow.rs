#![no_std]

use multiversx_sc::imports::*;

#[multiversx_sc::contract]
pub trait Escrow {
    #[init]
    fn init(&self) {}

    #[payable("EGLD")]
    #[endpoint(deposit)]
    fn deposit(&self) {
        let caller = self.blockchain().get_caller();
        let payment = self.call_value().egld_value().clone_value();

        let new_balance = self.user_balance(&caller).get() + payment;
        self.user_balance(&caller).set(new_balance);
    }

    #[endpoint(withdraw)]
    fn withdraw(&self) {
        let caller = self.blockchain().get_caller();
        let balance = self.user_balance(&caller).get();

        self.user_balance(&caller).clear();
        self.tx().to(&caller).egld(&balance).transfer();
    }

    // storage

    #[view(getUserBalance)]
    #[storage_mapper("userBalance")]
    fn user_balance(&self, address: &ManagedAddress) -> SingleValueMapper<BigUint>;
}