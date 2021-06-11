const mongoose = require("mongoose");

const diarySchema = mongoose.Schema(
    {
        pages: [
            {
                content: {
                    type: String,
                    trim: true,
                    required: [true, "content should not be empty!"],
                },
                climate: {
                    type: String,
                },
                location: {
                    lat: Number,
                    lng: Number,
                },
                writtenAt: {
                    type: Date,
                    default: Date.now(),
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
        timestamps: true,
    }
);

module.exports = mongoose.model("Diary", diarySchema);
