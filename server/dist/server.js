"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
require('./config/dbConfig');
const userRoutes_1 = require("./routes/userRoutes");
const adminRoutes_1 = require("./routes/adminRoutes");
const doctorRoutes_1 = require("./routes/doctorRoutes");
const app = (0, express_1.default)();
const port = process.env.PORT || 7000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/user', userRoutes_1.router);
app.use('/api/admin', adminRoutes_1.router);
app.use('/api/doctor', doctorRoutes_1.router);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
