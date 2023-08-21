import finalSale_model from '../models/finalSale_model.js';

export const saveFinalSale = async (req, res) => {
    try {
        const finalSaleData = req.body;
        console.log(finalSaleData);
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'You must be logged in' });
        }
        await savedFinalSale.save();
        res.status(201).json(savedFinalSale);
    } catch (error) {
        console.error('Error saving final sale:', error);
        res.status(500).json({ error: 'An error occurred while saving the final sale.' });
    }
};