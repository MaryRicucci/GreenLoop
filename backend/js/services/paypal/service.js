const axios = require("axios");

// 1) Genera access token PayPal
async function generaAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios.post(
    `${process.env.PAYPAL_API}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

// 2) Crea ordine PayPal
async function creaOrdinePayPal(amount) {
  const accessToken = await generaAccessToken();

  const ordine = await axios.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: amount,
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return ordine.data; // contiene id, status, links
}

// 3) Endpoint Express
app.post("/pagamenti/crea", async (req, res) => {
  const { amount } = req.body;

  try {
    const ordine = await creaOrdinePayPal(amount);

    res.json({
      success: true,
      orderId: ordine.id,
      links: ordine.links, // contiene approval_url
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
