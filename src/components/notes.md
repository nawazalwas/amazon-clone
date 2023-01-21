const hnadleDb = async (key, cart,paymentIntent,user) => {
    console.log(paymentIntent);
    const users = collection(db, 'users')
    const userId = doc(users, user?.uid);
    const orders = collection(userId, 'orders')
    const order = doc(orders, paymentIntent.id);
    const id = collection(order, key);
    await addDoc(id, {
      cart: cart[key],
      amount: paymentIntent.amount,
      created: paymentIntent.created
    }).then(docRef => {
        console.log("Document has been added successfully");
      }).catch(error => {
        console.log(error);
      })
  }

  import { collection, addDoc, doc } from "firebase/firestore";

  url: `http://127.0.0.1:5001/clone-196e9/us-central1/api/payments/create?total=${getBasketTotal(cart) * 100}`

  sk_test_51HPvU9DFg5koCdLGeOEiFvwHat4v8eMjX6SY0YCwxPBQBUPhKy1fPVhiSM5cQtgW7QBG9ydQcXnW57TDxVE2f3H000HSfmEQZF