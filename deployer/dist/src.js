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
exports.pullS3Files = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const conf_1 = require("./conf");
const s3 = new aws_sdk_1.S3({
    accessKeyId: conf_1.S3_KEY,
    secretAccessKey: conf_1.S3_SECRET,
    region: conf_1.AWS_REGION
});
function pullS3Files(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const allFiles = yield s3.listObjectsV2({
            Bucket: "vercel-aws-bucket",
            Prefix: folderPath
        }).promise();
        const files = ((_a = allFiles.Contents) === null || _a === void 0 ? void 0 : _a.map((_b) => __awaiter(this, [_b], void 0, function* ({ Key }) {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!Key) {
                    resolve("");
                    return;
                }
                else {
                    const outputPath = path_1.default.join(__dirname, Key);
                    const outputFile = fs_1.default.createWriteStream(outputPath);
                    const directory = path_1.default.dirname(outputPath);
                    if (!fs_1.default.existsSync(directory)) {
                        fs_1.default.mkdirSync(directory, { recursive: true });
                    }
                    s3.getObject({
                        Bucket: "vercel-aws-bucket",
                        Key: Key
                    }).createReadStream().pipe(outputFile).on("finish", () => {
                        resolve("");
                    });
                }
            }));
        }))) || [];
        console.log(files);
        yield Promise.all(files === null || files === void 0 ? void 0 : files.filter(x => x !== undefined));
    });
}
exports.pullS3Files = pullS3Files;
