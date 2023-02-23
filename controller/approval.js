const authSchema = require("../Model/auth");
const { mailer } = require("../utility/mailer");

const approvalController = async (req, res) => {
  try {
    console.log(req.user.role);
    const { role } = req.user;
    const { email, isApproverApproved, isSupervisorApproved, sendback } =
      req.body;
    if (role == "approver") {
      if (isApproverApproved == true) {
        const user = await authSchema.updateOne(
          { email },
          { isApproverApproved, isSupervisorApproved: true }
        );
        if (user) {
          const subject = "Your Account Approved";
          const message = "Welcome to our application.your account is approved";
          mailer(email, subject, message);
          res.status(200).json({ message: "user account approved", user });
        }
      } else if (isApproverApproved == false) {
        const user = await authSchema.updateOne(
          { email },
          { isApproverApproved: true, isSupervisorApproved: false }
        );
        if (user) {
          res
            .status(400)
            .json({ message: `${email} account rejected by approver`, user });
        }
      } else if (sendback) {
        const user = await authSchema.updateOne(
          { email },
          { isApproverApproved: true }
        );
        const subject = "entered detail is incorrect";
        mailer(email, subject, sendback);
        res
          .status(406)
          .json({ message: "content not acceptable, need more details" });
      }
    } else if (role == "supervisor") {
      if (isSupervisorApproved == true) {
        const user = await authSchema.updateOne(
          { email },
          { isSupervisorApproved }
        );
        if (user) {
          const subject = "Your Account Approved";
          const message = "Welcome to our application.your account is approved";
          mailer(email, subject, message);
          res.status(200).json({ message: "user account approved", user });
        }
      } else {
        const subject = "You Account Rejected";
        const message = "sorry...! your account got rejected";
        mailer(email, subject, message);
        res.json({ message: "user account rejected" });
      }
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { approvalController };
