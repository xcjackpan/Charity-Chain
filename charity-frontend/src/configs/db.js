import { db } from './firebase';

// User API


export const getListOfUsers = () => {
  return db.ref('users').once('value')
    .then(snapshot => {
      return snapshot.val();
    });
}

export const getSpecificUser = (uid) => {
  return db.ref(`users/${uid}`).once('value')
    .then(snapshot => {
      return snapshot.val();
    });
}

export const getRefOfCharities = () => {
  return db.ref('charities').once('value')
    .then(snapshot => {
      return snapshot.val();
    });
}

export const getSpecificCharity = (uid) => {
  return db.ref(`charities/${uid}`).once('value')
    .then(snapshot => {
      return snapshot.val();
    });
}

export const addTransactionToUser = (uid, public_id) => {
    db.ref(`users/${uid}/transaction/${public_id}`).push(public_id);
}

export const getRefOfTransactions = (uid) =>
    db.ref(`users/${uid}/transactions`);

export const consumeTransactionFromUser = (uid, public_id) => {
    db.ref(`users/${uid}/consumed_transaction/${public_id}`).push(public_id);
}

//export const upvoteImage = (uid, public_id) => {
//  db.ref(`users/${uid}/upvoted/${public_id}`).push(public_id);
//  let imageRef = db.ref(`images/${public_id}`);
//  imageRef.transaction(data => {
//    data.upvote++;
//    return data;
//  });
//}

export const getRefOfConsumedTransactions = (uid) =>
  db.ref(`users/${uid}/consumed_transactions`);

export const doCreateCharity = (id, account_number, email, image) =>
  db.ref('charities').push({
    public_id: id,
    account_number,
    email,
    image,
  });

export const doCreateUser = (id, username, email) => {
  let favourites = {placeholder: 'empty_child'};
  let uploaded = {placeholder: 'empty_child'}
  let upvoted = {placeholder: 'empty_child' }
  return db.ref(`users/${id}`).set({
    favourites,
    uploaded,
    upvoted,
    username,
    email,
  });
}
