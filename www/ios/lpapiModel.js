var exec = require("cordova/exec");

function LPAPIModel() {};

/**
 * @brief   设置打印机型号限制。
 */
LPAPIModel.prototype.jsSetSupportPrefixs = function (option) {
    exec(null, null, 'ocLPAPIModel', 'setSupportPrefixs', option);
};

/**
 * @brief   获取当前连接的打印机名称。
 */
LPAPIModel.prototype.jsConnectingPrinterName = function (success, fail) {
    exec(success, fail, 'ocLPAPIModel', 'connectingPrinterName');
};

/**
 * @brief   获取搜索到的打印机列表。
 */
LPAPIModel.prototype.jsScanPrinters = function (success, fail) {
    exec(success, fail, 'ocLPAPIModel', 'scanPrinters');
};

/**
 * @brief   打开指定名称的打印机，进行打印。
 */
LPAPIModel.prototype.jsOpenPrinter = function (success, fail, option) {
     exec(success, fail, 'ocLPAPIModel', 'openPrinter', option);
};

/**
 * @brief   关闭打开的打印机。
 */
LPAPIModel.prototype.jsClosePrinter = function () {
    exec(null, null, 'ocLPAPIModel', 'closePrinter');
};

/**
 * @brief   以指定的参数，开始打印。
 */
LPAPIModel.prototype.jsStartPrint = function (option) {
    exec(null, null, 'ocLPAPIModel', 'startPrint', option);
};

/**
 * @brief   提交打印数据，进行真正的打印。
 */
LPAPIModel.prototype.jsCommitPrint = function (success, fail) {
    exec(success, fail, 'ocLPAPIModel', 'commitPrint');
};

/**
 * @brief   设置打印元素的旋转角度。
 */
LPAPIModel.prototype.jsSetItemOrientation = function (option) {
    exec(null, null, 'ocLPAPIModel', 'setItemOrientation', option);
};

/**
 * @brief   设置打印元素的水平对齐方式。
 */
LPAPIModel.prototype.jsSetItemHorizontalAlignment = function (option) {
    exec(null, null, 'ocLPAPIModel', 'setItemHorizontalAlignment', option);
};

/**
 * @brief   设置打印元素的垂直对齐方式。
 */
LPAPIModel.prototype.jsSetItemVerticalAlignment = function (option) {
    exec(null, null, 'ocLPAPIModel', 'setItemVerticalAlignment', option);
};

/**
 * @brief   打印文本。
 */
LPAPIModel.prototype.jsDrawText = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawText', option);
};

/**
 * @brief   打印 Barcode 一维码。
 */
LPAPIModel.prototype.jsDrawBarcode = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawBarcode', option);
};

/**
 * @brief   打印 QRCode 二维码。
 */
LPAPIModel.prototype.jsDrawQRCode = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawQRCode', option);
};

/**
 * @brief   打印图像文件。支持本地文件或URL网络文件。
 */
LPAPIModel.prototype.jsDrawImage = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawImage', option);
};
LPAPIModel.prototype.jsDrawFullImage = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawFullImage', option);
};

/**
 * @brief   打印图像。
 */
LPAPIModel.prototype.jsDrawImageWithImage = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawImageWithImage', option);
};
LPAPIModel.prototype.jsDrawFullImageWithImage = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawFullImageWithImage', option);
};

/**
 * @brief   打印直线。
 */
LPAPIModel.prototype.jsDrawLine = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawLine', option);
};

/**
 * @brief   打印矩形。
 */
LPAPIModel.prototype.jsDrawRectangle = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawRectangle', option);
};

/**
 * @brief   打印圆角矩形。
 */
LPAPIModel.prototype.jsDrawRoundRectangle = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawRoundRectangle', option);
};

/**
 * @brief   打印椭圆。
 */
LPAPIModel.prototype.jsDrawEllipse = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawEllipse', option);
};

/**
 * @brief   打印正圆。
 */
LPAPIModel.prototype.jsDrawCircle = function (option) {
    exec(null, null, 'ocLPAPIModel', 'drawCircle', option);
};
               
var lpapiModel = new LPAPIModel();
module.exports = lpapiModel;
