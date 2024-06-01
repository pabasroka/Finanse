const router = require("express").Router();
const { Finance, validateFinance } = require("../models/finance");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const model = { ...req.body, userId: req.user._id };
    const { error } = validateFinance(model);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const finance = new Finance(model);
    await finance.save();
    res
      .status(201)
      .send({ message: "Finance entry created successfully", finance });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let query = { userId: req.user._id };
    const { start, end } = req.query;

    if (start && start !== "null") {
      query.date = { $gte: new Date(start) };
    }

    if (end && end !== "null") {
      if (!query.date) {
        query.date = {};
      }
      query.date.$lte = new Date(end);
    }

    const finances = await Finance.find(query);
    res.status(200).send(finances);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (!finance)
      return res.status(404).send({ message: "Finance entry not found" });

    res.status(200).send(finance);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/:id", auth, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
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
