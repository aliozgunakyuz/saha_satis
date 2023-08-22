import finalSale_model from '../models/finalSale_model.js';

export const saveFinalSale = async (req, res) => {
    try {
        
        const finalSaleData = req.body;
        const user = req.user;
        console.log(finalSaleData);
        if (!user) {
            return res.status(401).json({ error: 'You must be logged in' });
        }
        const newFinalSale = new finalSale_model(finalSaleData);
        const savedFinalSale = await newFinalSale.save();

        console.log("aaaaaaaaa" ,savedFinalSale);
        res.status(201).json({ message: 'Final sale data saved successfully', data: finalSaleData });
    } catch (error) {
        console.error('Error saving final sale:', error);
        res.status(500).json({ error: 'An error occurred while saving the final sale.' });
    }
};

export const getFinalSales = async (req, res) => {
    try {
        const finalSales = await finalSale_model.find(); 
        res.status(200).json(finalSales); 
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export async function updateSaleStatus(req, res) {
    try {
      const { saleId,newstatus} = req.params;
  
      await finalSale_model.findByIdAndUpdate(saleId, { status: newstatus });
  
      res.status(200).json({ message: 'Sale Status updated successfully' });
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: 'Failed to update sale status' });
    }
  }