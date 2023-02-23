const { genSalt, hash } = require("bcryptjs");
const { model, Schema } = require("mongoose");

const authSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "approver", "supervisor"],
      default: "user",
    },
    isApproverApproved: {
      type: Boolean,
      default: false,
    },
    isSupervisorApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

authSchema.pre("save", async function () {
  let salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

module.exports = model("auth", authSchema);
