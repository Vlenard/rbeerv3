import mongoose, { Document, Schema } from "mongoose";

export interface IBeer extends Document {
    name: string;
    type: "lager" | "ipa" | "apa" | "stout" | "porter";
    note?: string;
    rate: number;
}

const BeerSchema = new Schema<IBeer>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["lager", "ipa", "apa", "stout", "porter"],
        },
        note: {
            type: String,
            required: false,
        },
        rate: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
    },
    {
        timestamps: true
    },
);

export const Beer = mongoose.model<IBeer>("Beer", BeerSchema);
