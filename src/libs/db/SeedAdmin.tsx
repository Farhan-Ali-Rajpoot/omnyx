import AdminModel from "@/models/admin.model";
import { connectDB } from "@/libs/db/connectDB";


export async function SeedAdmin () {
    try{

        connectDB();

        const authName = process.env.ADMIN_NAME;
        const authPassword = process.env.ADMIN_PASSWORD;

        if (!authName || !authPassword) {
            console.error("Admin credentials are not set in environment variables.");
            return;
        }

        // Check if admin already exists
        const existingAdmin = await AdminModel.findOne({ name: authName });

        if (existingAdmin) {
            console.log("Admin already exists, skipping seed.");
            return;
        }

        // Create new admin
        const newAdmin = new AdminModel({
            name: authName,
            password: authPassword,
        });

        await newAdmin.save();
        console.log("Admin seeded successfully.");

    }catch(err: any){
        console.error("Error seeding admin:", err);
    }
}