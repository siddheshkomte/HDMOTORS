const https = require('https');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { amount, currency = 'INR', receipt = 'receipt_1' } = req.body || {};

    if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }

    const key_id = (process.env.RAZORPAY_KEY_ID || '').trim();
    const key_secret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

    if (!key_id || !key_secret) {
        return res.status(500).json({ error: 'Razorpay keys not configured' });
    }

    const data = JSON.stringify({ amount, currency, receipt });

    const options = {
        hostname: 'api.razorpay.com',
        port: 443,
        path: '/v1/orders',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
            'Authorization': 'Basic ' + Buffer.from(`${key_id}:${key_secret}`).toString('base64')
        }
    };

    return new Promise((resolve) => {
        const request = https.request(options, (response) => {
            let responseBody = '';
            response.on('data', (chunk) => responseBody += chunk);
            response.on('end', () => {
                try {
                    const parsed = JSON.parse(responseBody);
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        res.status(200).json(parsed);
                    } else {
                        res.status(response.statusCode || 500).json(parsed);
                    }
                } catch (e) {
                    res.status(500).json({ error: 'Parsing error' });
                }
                resolve();
            });
        });

        request.on('error', (e) => {
            res.status(500).json({ error: 'Request failed', details: e.message });
            resolve();
        });

        request.write(data);
        request.end();
    });
}
