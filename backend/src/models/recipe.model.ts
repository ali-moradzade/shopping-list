import {model, Schema} from "mongoose";

interface Ingredient {
    name: string;
    amount: string;
}

interface Recipe {
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
}

const recipeSchema = new Schema<Recipe>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name: String,
            amount: Number,
        }
    ]
});

recipeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;

        for (const ingredient of ret.ingredients) {
            delete ingredient._id;
        }
    }
});

export const Recipe = model<Recipe>('Recipe', recipeSchema);
