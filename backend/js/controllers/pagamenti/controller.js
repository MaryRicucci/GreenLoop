import { creaOrdinePayPal } from "../services/paypal.service.js";
import { creaOrdineSatispay } from "../services/satispay.service.js";

export async function creaPagamento(req, res) {
  const { amount, metodo } = req.body;

  try {
    let ordine;

    if (metodo === "paypal") ordine = await creaOrdinePayPal(amount);
    if (metodo === "satispay") ordine = await creaOrdineSatispay(amount);

    res.json({ success: true, orderId: ordine.id });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
