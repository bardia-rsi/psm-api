import type { Schema } from "mongoose";

const updatedAt = (schema: Schema): void => {
    schema.pre("save", function (next) {
        if (!this.isNew) {
            this.set({ updatedAt: Date.now() });
        }

        next();
    })
}

export default updatedAt;