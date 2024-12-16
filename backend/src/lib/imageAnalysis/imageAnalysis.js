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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImageToFile = exports.processImageToGrayScale = exports.loadImageFromUrl = void 0;
// import {Jimp} from "jimp"
var jimp_1 = require("jimp");
var axios_1 = require("axios");
var fs_1 = require("fs");
var path_1 = require("path");
// File Loader
var loadImageFromUrl = function (imageUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var response, imageBuffer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(imageUrl, { responseType: "arraybuffer" })];
            case 1:
                response = _a.sent();
                imageBuffer = Buffer.from(response.data);
                return [4 /*yield*/, jimp_1.default.read(imageBuffer)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                throw new Error("Failed to load image from URL: ${error.massage}");
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loadImageFromUrl = loadImageFromUrl;
var processImageToGrayScale = function (image) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            image.grayscale();
            return [2 /*return*/, image];
        }
        catch (error) {
            throw new Error("Failed to process image ${error.message");
        }
        return [2 /*return*/];
    });
}); };
exports.processImageToGrayScale = processImageToGrayScale;
var saveImageToFile = function (image) { return __awaiter(void 0, void 0, void 0, function () {
    var outputDir, outputFileName, outputPath, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                outputDir = path_1.default.resolve(__dirname, "../output");
                return [4 /*yield*/, fs_1.promises.mkdir(outputDir, { recursive: true })];
            case 1:
                _a.sent();
                outputFileName = "grayyscale_".concat(Date.now(), ".jpg");
                outputPath = path_1.default.join(outputDir, outputFileName);
                // Save file
                return [4 /*yield*/, image.writeAsync(outputPath)];
            case 2:
                // Save file
                _a.sent();
                return [2 /*return*/, outputPath];
            case 3:
                error_2 = _a.sent();
                throw new Error("Failed to save output file");
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.saveImageToFile = saveImageToFile;
// Image process
//
