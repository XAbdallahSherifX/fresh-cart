"use server"
import PaymentPage from "@/app/_Components/PaymentPage/PaymentPage";
import getMyToken from "@/utilities/getMyToken";

export default async function Checkout({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getMyToken();
  if (!token) {
    return;
  }
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    headers: { token },
  });
  const payload = await res.json();
  return <PaymentPage addresses={payload.data} id={id} />;
}
