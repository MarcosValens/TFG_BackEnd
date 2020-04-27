module.exports = (req, res) => {
    res.status(400).json({message: "Resource not found"});
};