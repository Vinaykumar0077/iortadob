const logoutController = async (req, res) => {
  try {
    const options = {
      expires: new Date(new Date().getTime() + 60 * 1000),
      httpOnly: true,
    };
    res
      .cookie("cookie", "", options)
      .status(200)
      .json({ message: "You Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = { logoutController };
