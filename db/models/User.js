module.exports = mongoose => {
    const userSchema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        },
        {timestamps: true}
    );

    userSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model(
        "User",
        userSchema
    );
};
