import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['superAdmin', 'admin', 'editor', 'viewer'],
            required: true,
            default: 'admin',
        },
    },
    { timestamps: true }
);

// ✅ Hash password if modified
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

// ✅ Generate JWT
AdminSchema.methods.generateJWT = async function () {
    const payload = {
        id: this._id,
        name: this.name,
        role: this.role,
    };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
    return token;
};

// ✅ Password comparison
AdminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default AdminModel;