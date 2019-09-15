import link_auth from './link_auth';

const { link } = require('@blockmason/link-sdk');
const { clientId, clientSecret } = link_auth;

const chain = link({
    clientId,
    clientSecret
}, {
    fetch
});

export const getBalance = (address) =>
    chain.get('/getBalanceOfWallet', { token_holder : address });

export const depositMoney = (amount_to_deposit, receiver) =>
    chain.post('/depositMoney', { amountToDeposit : amount_to_deposit, receiver, 'Access-Control-Allow-Origin': '*' });

export const sendToCharity = (amount_to_send, sender, receiver, timestamp) =>
    chain.post('/sendToCharity', { amount_spent : amount_to_send, sender, receiver, senderTimestamped : sender + '@' + timestamp, 'Access-Control-Allow-Origin': '*'  });

export const reimburseTransaction = (amount_to_send, charity_address, td_transaction_record, category) => 
    chain.post('/reimburseTransaction', { amount_spent : amount_to_send, charity : charity_address, td_transaction_record : td_transaction_record, category : category });

export const getAllDeposits = () =>
    chain.get('/events/Deposit');

export const getAllReimbursements = () =>
    chain.get('/events/Reimbursement');
