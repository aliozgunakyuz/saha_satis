import finalSale_model from '../models/finalSale_model.js';

export const saveFinalSale = async (req, res) => {
    const finalSaleData = req.body;

    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    try {
        const savedFinalSale = await finalSale_model.create(finalSaleData);
        res.status(201).json(savedFinalSale);
    } catch (error) {
        console.error('Error saving final sale:', error);
        res.status(500).json({ error: 'An error occurred while saving the final sale.' });
    }
};