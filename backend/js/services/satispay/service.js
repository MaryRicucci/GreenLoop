import { Satispay } from "@lucadiba/satispay-client";

// Inizializzazione client Satispay
const satispay = new Satispay.Client({
  keyId: process.env.SATISPAY_KEY_ID,
  privateKey: process.env.SATISPAY_PRIVATE_KEY,
  environment: "sandbox" // o "production"
});

// CREA PAGAMENTO
export async function creaOrdineSatispay(amount) {
  try {
    const payment = await satispay.payments.create({
      flow: "MATCH_CODE",       // flusso consigliato per pagamenti singoli
      amountUnit: amount * 100, // Satispay richiede importo in centesimi
      currency: "EUR",
      externalCode: `order_${Date.now()}`, // ID interno ordine
      redirectUrl: "https://tuodominio.com/satispay-ok",
      callbackUrl: "https://tuodominio.com/satispay-callback"
    });

    return payment; // contiene id, redirect_url, status
  } catch (err) {
    throw new Error("Errore creazione pagamento Satispay: " + err.message);
  }
}
