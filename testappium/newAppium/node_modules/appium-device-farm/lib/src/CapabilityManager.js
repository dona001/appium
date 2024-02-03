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
exports.iOSCapabilities = exports.androidCapabilities = void 0;
const get_port_1 = __importDefault(require("get-port"));
const lodash_1 = __importDefault(require("lodash"));
function isCapabilityAlreadyPresent(caps, capabilityName) {
    return lodash_1.default.has(caps.alwaysMatch, capabilityName) || lodash_1.default.has(caps.firstMatch[0], capabilityName);
}
function deleteAlwaysMatch(caps, capabilityName) {
    if (lodash_1.default.has(caps.alwaysMatch, capabilityName))
        delete caps.alwaysMatch[capabilityName];
}
function androidCapabilities(caps, freeDevice) {
    return __awaiter(this, void 0, void 0, function* () {
        caps.firstMatch[0]['appium:udid'] = freeDevice.udid;
        caps.firstMatch[0]['appium:systemPort'] = yield (0, get_port_1.default)();
        caps.firstMatch[0]['appium:chromeDriverPort'] = yield (0, get_port_1.default)();
        caps.firstMatch[0]['appium:adbRemoteHost'] = freeDevice.adbRemoteHost;
        caps.firstMatch[0]['appium:adbPort'] = freeDevice.adbPort;
        if (freeDevice.chromeDriverPath)
            caps.firstMatch[0]['appium:chromedriverExecutable'] = freeDevice.chromeDriverPath;
        if (!isCapabilityAlreadyPresent(caps, 'appium:mjpegServerPort')) {
            caps.firstMatch[0]['appium:mjpegServerPort'] = yield (0, get_port_1.default)();
        }
        deleteAlwaysMatch(caps, 'appium:udid');
        deleteAlwaysMatch(caps, 'appium:systemPort');
        deleteAlwaysMatch(caps, 'appium:chromeDriverPort');
        deleteAlwaysMatch(caps, 'appium:adbRemoteHost');
        deleteAlwaysMatch(caps, 'appium:adbPort');
    });
}
exports.androidCapabilities = androidCapabilities;
function iOSCapabilities(caps, freeDevice) {
    return __awaiter(this, void 0, void 0, function* () {
        caps.firstMatch[0]['appium:udid'] = freeDevice.udid;
        caps.firstMatch[0]['appium:deviceName'] = freeDevice.name;
        caps.firstMatch[0]['appium:platformVersion'] = freeDevice.sdk;
        caps.firstMatch[0]['appium:wdaLocalPort'] = freeDevice.wdaLocalPort;
        caps.firstMatch[0]['appium:mjpegServerPort'] = freeDevice.mjpegServerPort;
        caps.firstMatch[0]['appium:derivedDataPath'] = freeDevice.derivedDataPath;
        const deleteMatch = [
            'appium:derivedDataPath',
            'appium:platformVersion',
            'appium:wdaLocalPort',
            'appium:mjpegServerPort',
            'appium:udid',
            'appium:deviceName',
        ];
        deleteMatch.forEach((value) => deleteAlwaysMatch(caps, value));
    });
}
exports.iOSCapabilities = iOSCapabilities;
