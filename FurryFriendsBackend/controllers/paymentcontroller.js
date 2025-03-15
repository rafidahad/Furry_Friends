import express from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = false; // true for production

app.post("/initiate-payment", async (req, res) => {
    const { name, price } = req.body;
    const data = {
        total_amount: price,
        currency: "BDT",
        tran_id: "tran_" + new Date().getTime(),
        success_url: "http://localhost:5000/success",
        fail_url: "http://localhost:5000/fail",
        cancel_url: "http://localhost:5000/cancel",
        ipn_url: "http://localhost:5000/ipn",
        product_name: name,
        cus_name: "Customer",
        cus_email: "customer@example.com",
        cus_phone: "017xxxxxxxx",
        shipping_method: "NO",
        product_category: "Pet Accessories",
        product_profile: "general",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data)
        .then(apiResponse => {
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.json({ url: GatewayPageURL });
        })
        .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
