const authSchema = require("../../Model/auth");
const { mailer } = require("../../utility/mailer");

const approverCondition = async (email, age, isApproverApproved) => {
  if (age <= 18) {
    const user = await authSchema.updateOne(
      { email },
      { isApproverApproved, isSupervisorApproved: true, balance: 50000 }
    );
    return user;
  } else if (age > 18 && age <= 30) {
    const user = await authSchema.updateOne(
      { email },
      { isApproverApproved, isSupervisorApproved: true, balance: 100000 }
    );
    return user;
  } else if (age > 30) {
    const user = await authSchema.updateOne(
      { email },
      { isApproverApproved, isSupervisorApproved: true, balance: 150000 }
    );
    return user;
  }
};
const supervisorCondition = async (email, age, isSupervisorApproved) => {
  if (age <= 18) {
    const user = await authSchema.updateOne(
      { email },
      { isSupervisorApproved, balance: 50000 }
    );
    return user;
  } else if (age > 18 && age <= 30) {
    const user = await authSchema.updateOne(
      { email },
      { isSupervisorApproved, balance: 100000 }
    );
    return user;
  } else if (age > 30) {
    const user = await authSchema.updateOne(
      { email },
      { isSupervisorApproved, balance: 150000 }
    );
    return user;
  }
};

const approvalController = async (req, res) => {
  try {
    console.log(req.user.role);
    const { role } = req.user;
    const { email, isApproverApproved, isSupervisorApproved, sendback } =
      req.body;
    const registeredUser = await authSchema.findOne({ email });

    if (role == "approver") {
      if (isApproverApproved == true) {
        const user = await approverCondition(
          email,
          registeredUser.age,
          isApproverApproved
        );
        console.log("condition", user);
        if (user) {
          const subject = "Your Account Approved";
          const message = "Welcome to our application.your account is approved";
          mailer(email, subject, message);
          res.status(200).json({ message: "user account approved", user });
        } else {
          res.status(400).json({ message });
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
      } else {
        const user = await authSchema.updateOne(
          { email },
          { isApproverApproved: true, isSupervisorApproved: false }
        );
        if (user) {
          res
            .status(400)
            .json({ message: `${email} account rejected by approver`, user });
        }
      }
    } else if (role == "supervisor") {
      if (isSupervisorApproved == true) {
        const user = await supervisorCondition(
          email,
          registeredUser.age,
          isSupervisorApproved
        );
        console.log("11", user);
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
