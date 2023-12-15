"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
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
app.use('/api/products', productRoutes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Listening on port:', PORT));
