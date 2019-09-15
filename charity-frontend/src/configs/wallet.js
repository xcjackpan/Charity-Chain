const { link } = require('@blockmason/link-sdk');

const chain = link({
    clientId: '',
    clientSecret: ''
}, {
    fetch
});

export const getBalance = (address) =>
    chain.get('/getBalanceOfWallet', { token_holder : address });

export const depositMoney = (amount_to_deposit, receiver) =>
    chain.get('/depositMoney', { amountToDeposit : amount_to_deposit, receiver : receiver });

export const sendToCharity = (amount_to_send, sender, receiver) =>
    chain.get('/sendToCharity', { amount_spent : amount_to_send, sender : sender, receiver : receiver, senderTimestamped : sender + (new Date().getTime()) });

export const reimburseTransaction = (amount_to_send, charity_address, td_transaction_record, category) => 
    chain.get('/reimburseTransaction', { amount_spent : amount_to_send, charity : charity_address, td_transaction_record : td_transaction_record, category : category });

export const getAllDeposits = () =>
    chain.get('/events/Deposit');

export const getAllReimbursements = () =>
    chain.get('/events/Reimbursement');

