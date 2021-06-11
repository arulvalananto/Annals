const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema(
    {
        pin: {
            type: String,
            default: "",
        },
        entries: [
            {
                title: {
                    type: String,
                    required: true,
                },
                link: {
                    type: String,
                },
                username: {
                    type: String,
                },
                password: {
                    iv: String,
                    content: String,
                },
                risk: {
                    type: String,
                    default: "low",
                },
                passwordStrength: {
                    type: String,
                },
            },
        ],
    },
    {
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        },
    }
);

module.exports = mongoose.model("Passwords", passwordSchema);
