# CharityChain

_Submitted to Hack the North 2019_

CharityChain is a platform that allows users to donate to charities and see exactly what their money is being spent on. All transactions, both donations and charity expenditures, are tracked on a public Ethereum blockchain. This makes transaction information immutable, secure, and totally transparent. Users get to stay anonymous, while charities are put on blast. We make it easy to be generous and hard to be greedy.

## Technical Design

The UIs for both users and charities are built in React. We store key information, such as wallet addresses, about users and charities in a Realtime Database using Firebase. We decided to store all donation data inside a blockchain in order to ensure complete transparency and give the user a reason to trust what we're saying. Firebase finally also acts as a "lightning layer" so we can quickly operate on our data while the blockchain acts as our source of truth.

The blockchain stores reimbursements the charity can make, and donations the user gives as events. These are extremely cheap and easy to traverse, therefore it made sense to store frequent interactions with the chain.

See more on [Devpost](https://devpost.com/software/charitychain)
