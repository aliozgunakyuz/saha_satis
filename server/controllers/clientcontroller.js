import client_model from '../models/client_model.js';

export async function addclient(req, res) {
    try {
        const { clientname, clientaddress, clientphone, clientmail } = req.body;
        const clientnameExists = await client_model.findOne({ clientname });

        if (clientnameExists) {
            return res.status(400).send({ error: 'Product already exists.' });
        }

        if (!clientname || !clientaddress || !clientphone || !clientmail) {
            return res.status(400).send({ error: 'Price and stock are required fields.' });
        }

        const client = new client_model({
            clientname,
            clientaddress,
            clientphone,
            clientmail,
        });

        const result = await client.save();
        return res.status(201).send({ message: 'Client registration successfully completed' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
}