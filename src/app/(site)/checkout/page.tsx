import { CheckoutForm } from "../_components/CheckoutForm";


export default function Checkout() {

  return (
    <div className="pt-32 flex flex-col justify-center items-center">
      {/* Heading and description */}
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Checkout Page under maintenance 🚧
      </h1>
      <p className="text-base sm:text-lg text-center text-gray-500 mt-6 max-w-md">
        We&apos;re working hard to bring you a seamless checkout experience. In
        the meantime, you can pay now and continue.
      </p>

      {/* Payment Form */}
      <CheckoutForm />
    </div>
  );
}


