const {Schema} = require('mongoose');

module.exports = mongoose => {
    const activitySchema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            userId: {
                type: Schema.ObjectId,
                ref: 'User'
            },
            userToken: {
                type: String
            }
        },
        {timestamps: true}
    );

    activitySchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });


    return mongoose.model(
        "ActivityLog",
        activitySchema
    );
};
