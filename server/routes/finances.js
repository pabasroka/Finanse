const router = require("express").Router();
const { Finance, validateFinance } = require("../models/finance");

router.post("/", async (req, res) => {
  console.log(req, res);
  try {
    const { error } = validateFinance(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const finance = new Finance(req.body);
    await finance.save();
    res
      .status(201)
      .send({ message: "Finance entry created successfully", finance });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const finances = await Finance.find();
    res.status(200).send(finances);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (!finance)
      return res.status(404).send({ message: "Finance entry not found" });

    res.status(200).send(finance);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateFinance(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const finance = await Finance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!finance)
      return res.status(404).send({ message: "Finance entry not found" });

    res
      .status(200)
      .send({ message: "Finance entry updated successfully", finance });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const finance = await Finance.findByIdAndRemove(req.params.id);
    if (!finance)
      return res.status(404).send({ message: "Finance entry not found" });

    res.status(200).send({ message: "Finance entry deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
