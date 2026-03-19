import mongoose, { Document, Schema } from "mongoose";

export interface IBeer extends Document {
    name: string;
    type: "lager" | "ipa" | "apa" | "stout" | "porter";
    note?: string;
    rate: number;
    alcohol: number;
    owner: mongoose.Types.ObjectId;
}

const transformSchemaOutput = (doc: Document, ret: Record<string, any>) => {
    const { _id, __v, ...object } = ret;
    return { id: _id, ...object };
};

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
        alcohol: {
            type: Number,
            required: true,
            min: 1,
        },
        rate: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: transformSchemaOutput,
        },
        toObject: {
            transform: transformSchemaOutput,
        },
    },
);

export const Beer = mongoose.model<IBeer>("Beer", BeerSchema);
