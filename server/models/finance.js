const mongoose = require("mongoose");
const Joi = require("joi");

const financeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
  type: { type: String, enum: ["income", "outcome"], required: true },
  category: {
    type: String,
    enum: [
      "Gifts",
      "Groceries",
      "Transportation",
      "Healthcare",
      "Education",
      "Clothing",
      "Insurance",
      "Savings",
    ],
    required: true,
  },
  value: { type: Number, required: true },
});

const Finance = mongoose.model("finance", financeSchema);

const validateFinance = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    date: Joi.date().required().label("Date"),
    type: Joi.string().valid("income", "outcome").required().label("Type"),
    category: Joi.string()
      .valid(
        "Gifts",
        "Groceries",
        "Transportation",
        "Healthcare",
        "Education",
        "Clothing",
        "Insurance",
        "Savings"
      )
      .required()
      .label("Category"),
    value: Joi.number().required().label("Value"),
  });
  return schema.validate(data);
};

module.exports = { Finance, validateFinance };
