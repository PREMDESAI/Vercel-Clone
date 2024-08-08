"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_REGION = exports.S3_KEY = exports.S3_SECRET = void 0;
require('dotenv').config();
exports.S3_SECRET = process.env.S3_ACCESS_SECRET;
exports.S3_KEY = process.env.S3_ACCESS_KEY;
exports.AWS_REGION = process.env.AWS_REGION;
