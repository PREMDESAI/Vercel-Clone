"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("redis");
const redisQueue = (0, redis_1.createClient)();
const src_1 = require("./src");
redisQueue.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const res = yield redisQueue.rPop((0, redis_1.commandOptions)({
                isolated: true
            }), "redisQueue");
            console.log(res);
            const fileId = res === null || res === void 0 ? void 0 : res.element;
            yield (0, src_1.pullS3Files)(`/out/${fileId}`);
        }
    });
}
app.listen(3001, () => {
    console.log("Listening on port 3001"),
        main();
});
