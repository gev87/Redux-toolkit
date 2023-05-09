import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const Modal = () => {
	const dispatch = useDispatch();
	return (
		<aside className="modal-container">
			<div className="modal">
				<h4>Remove all items from your shopping cart?</h4>
				<div
					className="btn-container"
					onClick={() => {
						dispatch(closeModal());
					}}
				>
					<button onClick={() => dispatch(clearCart())} type="button" className="btn confirm-btn">
						confirm
					</button>
					<button type="button" className="btn clear-btn">
						cancel
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Modal;
