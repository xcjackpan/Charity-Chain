pragma solidity ^0.5.8;

contract Wallet {
    
    //struct Transaction {
    //    string category;
    //    string id;
    //    string user;
    //}
    
    mapping (address => int32) private balances;
    mapping (address => mapping(string => int32)) private charity_user;
    mapping (address => string[]) private charity_queue;
    //mapping (address => Transaction[]) private charity_transactions;
    
    event Deposit(int32 amountToTransfer, address sendTo, address sendFrom, uint256 timestamp);
    event Reimbursement(int32 amount, string reimburseFrom, string reimburseTo, string tdTransactionRecord, uint256 timestamp, string category);
    
    function getBalanceOfWallet(address token_holder) public view returns (int32 balance) {
        return balances[token_holder];
    }
    
    function withdrawMoney(address spender, int32 amountToSpend) public returns (int8 error_code) {
        if (balances[spender] < amountToSpend) return 1;
        if (amountToSpend < 0) return 2;
        balances[spender] -= amountToSpend;
        return 0;
    }
    
    function depositMoney(int32 amountToDeposit, address receiver) public returns (int8 error_code) {
        if (amountToDeposit < 0) {
          return 1;
        }
        balances[receiver] += amountToDeposit;
        return 0;
    }
    
    function sendToCharity(int32 amount_spent, address sender, address receiver, string memory senderTimestamped) public returns (int8 error_code) {
        int8 success = depositMoney(amount_spent, receiver);
        if (success == 0) {
            charity_user[receiver][senderTimestamped] = amount_spent;
            charity_queue[receiver].push(senderTimestamped);
            emit Deposit(amount_spent, receiver, sender, block.timestamp);
        }
        return success;
    }
    
    //function getNumberOfReimbursementsForCharity(address charity) public view returns (uint256 length) {
    //    return chariy_transactions[charity].length;
    //}
    //
    //function getReimbursementCategoryForCharity(address charity, uint256 index) public view returns (string memory category) {
    //    return charity_transactions[charity][index].category;
    //}
    //
    //function getReimbursementIdForCharity(address charity, string memory index) public view returns (string memory id) {
    //    return charity_transactions[charity][index].id;
    //}


    function reimburseTransaction(int32 amount_spent, address charity, string memory td_transaction_record, string memory category) public returns (int8 error_code) {
        int8 success = withdrawMoney(charity, amount_spent);
        if (success == 0) {
            uint32 indicesToSwap = 0;
            for (uint32 i = 0; i < charity_queue[charity].length; i++) {
                if (charity_user[charity][charity_queue[charity][i]] > amount_spent) {
                    charity_user[charity][charity_queue[charity][i]] -= amount_spent;
                    emit Reimbursement(amount_spent, charity_queue[charity][i], td_transaction_record, block.timestamp, category);
                    amount_spent = 0;
                } else {
                    emit Reimbursement(amount_spent, charity_queue[charity][i], td_transaction_record, block.timestamp, category);
                    amount_spent -= charity_user[charity][charity_queue[charity][i]];
                    indicesToSwap++; 
                }
                if (amount_spent == 0) break;
            }
            for (uint32 x = 0; x < indicesToSwap && (x + indicesToSwap) < charity_queue[charity].length; x++) {
                delete charity_user[charity][charity_queue[charity][x]];
                charity_queue[charity][x] = charity_queue[charity][x + indicesToSwap];
            }
            //Transaction memory t;
            //t.category = category;
            //t.id = td_transaction_record;
            //charity_transactions[charity].push(t);
            charity_queue[charity].length = charity_queue[charity].length - indicesToSwap;
        }
        return success;
    }
}
