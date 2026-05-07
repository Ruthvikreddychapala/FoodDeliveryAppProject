exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { location: { lat, lng } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};