const express = require('express');
const axios = require('axios');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-qris', async (req, res) => {
    const { amount, fee, uniqueCode, qrisData } = req.body;

    if (!amount || !qrisData) {
        return res.status(400).send({ status: false, message: "Amount and QRIS data are required." });
    }

    try {
        const totalAmount = amount + (fee || 0);

        // Generate QRIS
        const qrCodeData = await QRCode.toDataURL(qrisData);
        res.status(200).send({
            status: true,
            data: {
                totalAmount,
                qrCodeData,
            },
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`QRIS Backend running at http://localhost:${port}`);
});
