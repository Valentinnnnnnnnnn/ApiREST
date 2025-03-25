"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./shared/config/database");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// Try to connect to the database
try {
    (0, database_1.connectDatabase)();
}
catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
}
// Start the server
app_1.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    throw new Error(err.message);
});
