//
//  AMLPAPI.h
//  LPAPICordovaTest
//
//  Created by 蔡俊杰 on 2017/12/14.
//

#import <Cordova/CDVPlugin.h>

@interface AMLPAPI : CDVPlugin

/**
 * @brief   设置打印机型号限制。
 */
- (void)setSupportPrefixs:(CDVInvokedUrlCommand *)command;

/**
 * @brief   获取当前连接的打印机名称。
 */
- (void)connectingPrinterName:(CDVInvokedUrlCommand *)command;

/**
 * @brief   获取搜索到的打印机列表。
 */
- (void)scanPrinters:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打开指定名称的打印机，进行打印。
 */
- (void)openPrinter:(CDVInvokedUrlCommand *)command;

/**
 * @brief   关闭打开的打印机。
 */
- (void)closePrinter:(CDVInvokedUrlCommand *)command;

/**
 * @brief   以指定的参数，开始打印。
 */
- (void)startPrint:(CDVInvokedUrlCommand *)command;

/**
 * @brief   提交打印数据，进行真正的打印。
 */
- (void)commitPrint:(CDVInvokedUrlCommand *)command;

/**
 * @brief   设置打印元素的旋转角度。
 */
- (void)setItemOrientation:(CDVInvokedUrlCommand *)command;

/**
 * @brief   设置打印元素的水平对齐方式。
 */
- (void)setItemHorizontalAlignment:(CDVInvokedUrlCommand *)command;

/**
 * @brief   设置打印元素的垂直对齐方式。
 */
- (void)setItemVerticalAlignment:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印文本。
 */
- (void)drawText:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印 Barcode 一维码。
 */
- (void)drawBarcode:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印 QRCode 二维码。
 */
- (void)drawQRCode:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印图像文件。支持本地文件或URL网络文件。
 */
- (void)drawImage:(CDVInvokedUrlCommand *)command;
- (void)drawFullImage:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印图像。
 */
- (void)drawImageWithImage:(CDVInvokedUrlCommand *)command;
- (void)drawFullImageWithImage:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印直线。
 */
- (void)drawLine:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印矩形。
 */
- (void)drawRectangle:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印圆角矩形。
 */
- (void)drawRoundRectangle:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印椭圆。
 */
- (void)drawEllipse:(CDVInvokedUrlCommand *)command;

/**
 * @brief   打印正圆。
 */
- (void)drawCircle:(CDVInvokedUrlCommand *)command;

@end
