let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        first_name: {
            type: Schema.Types.String,
            default: ''
        },
        last_name: {
            type: Schema.Types.String,
            default: ''
        },
        email_id: {
            type: Schema.Types.String,
            default: ''
        },
        password: {
            type: Schema.Types.String,
            default: ''
        },
        employee_id: {
            type: Schema.Types.String,
            default: ''
        },
        organization_name: {
            type: Schema.Types.String,
            default: ''
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    },
    {strict: false }
);
module.exports = mongoose.model("user", userSchema, "user");
