import dotenv from 'dotenv';

dotenv.config();   

export default {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/pets',
    JWT_SECRET: process.env.JWT_SECRET,
    DB_Name: process.env.DB_Name || 'pets'
}