export const initialState = {
    cart: {},
    count: 0,
    user:null
}

export function getBasketTotal(cart){
    let total = 0;
    for (const key in cart) {
        total += cart[key].quantity*cart[key].price;
    }
    return total;
}

function reducer(state, action) {
    let cart = { ...state.cart };
    switch (action.type) {
        case 'SET_USER':
            return {...state,user:action.user};
        case 'LOCAL_STORAGE':
            return {...action.state}
        case 'ADD_TO_CART':
            const { id, title, price, rating, image } = action.item;

            if (cart[id]) {
                cart[id].quantity = cart[id].quantity + 1;
            } else {
                cart[id] = { title, price, rating, image, quantity: 1 };
            }
            localStorage.setItem("state",JSON.stringify({ ...state, cart: cart, count: state.count + 1 }));

            return { ...state, cart: cart, count: state.count + 1 };
        case 'REMOVE_FROM_CART':
            console.log("hi");
            const quat = cart[action.id].quantity;
            delete cart[action.id];
            localStorage.setItem("state",JSON.stringify({ ...state, cart: cart, count: state.count - quat }));
            return { ...state, cart: cart, count: state.count - quat };
        case 'ADD_QUANTITY':
            cart[action.id].quantity = cart[action.id].quantity + 1;
            
            localStorage.setItem("state",JSON.stringify({...state, cart: cart, count: state.count +1}))
            return {...state, cart: cart, count: state.count +1};
        case 'REMOVE_QUANTITY':
            if(cart[action.id].quantity == 1){
                return {...state};
            }else{
                cart[action.id].quantity = cart[action.id].quantity - 1;
            }
            localStorage.setItem("state",JSON.stringify({...state, cart: cart, count: state.count -1}))
            return {...state, cart: cart, count: state.count -1};
        case 'EMPTY_CART':
            localStorage.setItem("state",JSON.stringify({...state,cart:{},count:0}))
            return {...state,cart:{},count:0}
        default:
            return state;
    }
}

export default reducer;