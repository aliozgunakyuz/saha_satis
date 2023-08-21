import discount_model from '../models/discount_model.js';

export async function adddiscount(req, res) {
    try {
        const { discountcode, discountpercent} = req.body;
        const discountcodeExists = await discount_model.findOne({ discountcode });

        if (discountcodeExists) {
            return res.status(400).send({ error: 'Discount code already exists.' });
        }

        if (!discountcode || !discountpercent) {
            return res.status(400).send({ error: 'Discount Code & Discount Percent are required fields.' });
        }

        const discount = new discount_model({
            discountcode,
            discountpercent,

        });
        const result = await discount.save();
        return res.status(201).send({ message: 'Discount registration successfully completed' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
}

export async function getdiscounts(req, res) {
    try {
      const discounts = await discount_model.find();
  
      if (!discounts || discounts.length === 0) {
        return res.status(404).json({ message: 'No discount option found.' });
      }
      return res.status(200).json(discounts);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  export async function deleteDiscount(req, res) {
    try {
      const discountId = req.params.discountId;
      
      await discount_model.findByIdAndDelete(discountId);
  
      return res.status(200).send({ message: 'Discount Code deleted successfully' });
    } catch (error) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  }

  export async function discountcheck(req, res) {
    const discountCode = req.params.code;

    try {
        const existingCode = await discount_model.findOne({ discountcode: discountCode });

        if (existingCode) {
            res.json({ isValid: true, discountPercent: existingCode.discountpercent });
        } else {
            res.json({ isValid: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}
