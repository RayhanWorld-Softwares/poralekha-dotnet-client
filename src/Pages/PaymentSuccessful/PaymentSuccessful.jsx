import { useParams } from "react-router-dom";


const PaymentSuccessful = () => {
	const {tranId} = useParams()
	console.log(tranId);
	return (
		<div>
			payment successful transactionId is : {tranId}
		</div>
	);
};

export default PaymentSuccessful;