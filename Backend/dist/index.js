"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const connection_1 = __importDefault(require("./database/connection"));
dotenv_1.default.config();
(0, connection_1.default)()
    .then(result => {
    console.log(result);
})
    .catch(error => {
    console.log(error);
});
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use('/api/images', express_1.default.static('images'));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/client', clientRoutes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
