import CartItem from './CartItem';

const reducer = (state, action) => {
	if (action.type === 'CLEAR_CART') {
		return { ...state, cart: [] };
	}
	if (action.type === 'REMOVE') {
		return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
	}
	if (action.type === 'ALTER_AMOUNT') {
		const { id, isIncreasing } = action.payload;
		let newCart = state.cart
			.map((item) => {
				if (item.id === id) {
					return { ...item, amount: item.amount + (isIncreasing ? 1 : -1) };
				}
				return item;
			})
			.filter((item) => item.amount !== 0);
		return { ...state, cart: newCart };
	}
	if (action.type === 'GET_TOTALS') {
		let { total, amount } = state.cart.reduce(
			(cartTotal, cartItem) => {
				const { price, amount } = cartItem;
				cartTotal.amount += amount;
				cartTotal.total += amount * price;
				return cartTotal;
			},
			{ total: 0, amount: 0 }
		);
		total = parseFloat(total.toFixed(2));

		return { ...state, total, amount };
	}
	if (action.type === 'LOADING') {
		return { ...state, loading: true };
	}
	if (action.type === 'DISPLAY_ITEMS') {
		return { ...state, cart: action.payload, loading: false };
	}
	return state;
};

export default reducer;
