//
//  LPAPI.h
//  LPAPI
//
//  Created by 蔡俊杰 on 2016/10/25.
//  Copyright © 2016年 DothanTech. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef void (^DzDidOpenedPrinterBlock)(BOOL isSuccess);

@interface LPAPI : NSObject

/**
 * @brief   设置打印机型号限制。
 *
 * @param   supportPrefixs      型号前缀限制列表。
 */
+ (void)setSupportPrefixs:(NSArray *)supportPrefixs;

/**
 * @brief   获取当前连接的打印机名称。
 */
+ (NSString *)connectingPrinterName;

/**
 * @brief   获取搜索到的打印机列表。
 *
 * @param   completion          搜索后的操作。
 *
 * @note    scanedPrinterNames  打印机名称列表。
 */
+ (void)scanPrinters:(void(^)(NSArray *scanedPrinterNames))completion;

/**
 * @brief   打开指定名称的打印机，进行打印。
 *
 * @param   printerName 打印机名称。如果为空字符串，则打开当前客户端系统上的第一个支持的打印机。支持直接输入打印机型号。
 * @param   completion  连接打印机后的操作。
 *
 * @note    isSuccess   连接打印机是否成功。
 */
+ (void)openPrinter:(NSString *)printerName
         completion:(DzDidOpenedPrinterBlock)completion;

/**
 * @brief   关闭打开的打印机。
 */
+ (void)closePrinter;

/**
 * @brief   以指定的参数，开始打印。
 *
 * @param   width       标签宽度（单位由 scaleUnit 指定）
 * @param   height      标签高度（单位由 scaleUnit 指定）
 * @param   orientation 标签打印方向。0：不旋转；90：顺时针旋转90度；180：旋转180度；270：逆时针旋转90度。
 * @param   scaleUnit   打印任务的尺寸单位。0：像素；1：1毫米。建议使用。
 * @param   jobName     打印任务的名称，可以为空字符串。
 *
 * @return  成功与否。
 */
+ (BOOL)startPrint:(CGFloat)width
            height:(CGFloat)height
       orientation:(int)orientation
         scaleUnit:(int)scaleUnit
           jobName:(NSString *)jobName;

/**
 * @brief   提交打印数据，进行真正的打印。
 *
 * @param   completion  打印后的操作。
 *
 * @note    isSuccess   打印结果是否成功。
 */
+ (void)commitPrint:(void(^)(BOOL isSuccess))completion;

/**
 * @brief   设置打印元素的旋转角度。
 *
 * @param   orientation 标签打印方向。0：不旋转；90：顺时针旋转90度；180：旋转180度；270：逆时针旋转90度。
 *
 * @return  成功与否。
 */
+ (BOOL)setItemOrientation:(int)orientation;

/**
 * @brief   设置打印元素的水平对齐方式。
 *
 * @param   alignment   水平对齐方式。0：水平居左（默认方式）；1：水平居中；2：水平居右。
 *
 * @return  成功与否。
 */
+ (BOOL)setItemHorizontalAlignment:(int)alignment;

/**
 * @brief   设置打印元素的垂直对齐方式。
 *
 * @param   alignment   垂直对齐方式。0：垂直居上（默认方式）；1：垂直居中；2：垂直居下。
 *
 * @return  成功与否。
 */
+ (BOOL)setItemVerticalAlignment:(int)alignment;

/**
 * @brief   打印文本。
 *
 * @param   text        文本内容。
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   fontName    文本的字体名称，比如“黑体”。
 * @param   fontHeight  文本的字体高度，单位由 scaleUnit 指定。
 * @param   fontStyle   文本的打印风格。0：正常；1：粗体；2：斜体；4：下划线；8：删除线。
 *
 * @return  成功与否。
 */
+ (BOOL)drawText:(NSString *)text
               x:(CGFloat)x
               y:(CGFloat)y
           width:(CGFloat)width
          height:(CGFloat)height
        fontName:(NSString *)fontName
      fontHeight:(CGFloat)fontHeight
       fontStyle:(int)fontStyle;

/**
 * @brief   打印 Barcode 一维码。
 *
 * @param   text        一维码的内容。
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   fontName    文本的字体名称，比如“黑体”。
 * @param   fontHeight  文本的字体高度，单位由 scaleUnit 指定。
 * @param   fontStyle   文本的打印风格。0：正常；1：粗体；2：斜体；4：下划线；8：删除线。
 * @param   textFlag    文本的位置。0：无文字；1：条码上方；2：条码下方。
 *
 * @return  成功与否。
 */
+ (BOOL)drawBarcode:(NSString *)text
                  x:(CGFloat)x
                  y:(CGFloat)y
              width:(CGFloat)width
             height:(CGFloat)height
           fontName:(NSString *)fontName
         fontHeight:(CGFloat)fontHeight
          fontStyle:(int)fontStyle
           textFlag:(NSUInteger)textFlag;

/**
 * @brief   打印 QRCode 二维码。
 *
 * @param   text        二维码的内容。
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 *
 * @return  成功与否。
 */
+ (BOOL)drawQRCode:(NSString *)text
                 x:(CGFloat)x
                 y:(CGFloat)y
             width:(CGFloat)width
            height:(CGFloat)height;
+ (BOOL)drawQRCode:(NSString *)text
                 x:(CGFloat)x
                 y:(CGFloat)y
             width:(CGFloat)width;

/**
 * @brief   打印图像文件。支持本地文件或URL网络文件。
 *
 * @param   file        本地文件全路径名称或URL网络文件。
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   threshold   图像转成打印用黑白图像的灰度阀值。
 1～255 表示灰度阀值，灰度值>=该阀值的点将被当作白点而丌打印；
 256 表示将图像转成灰度图片之后再打印，灰度点向黑白点的转换由打印机驱劢来完成；
 0/257 表示直接采用图像原始颜色进行打印，原始颜色向黑白色的转换由打印机驱劢来完成。
 对于打印二维码图片，建议灰度阀值设置为192；
 对于打印LOGO等图片，建议灰度阀值设置为0。
 *
 * @return  成功与否。
 */
+ (BOOL)drawImage:(NSString *)file
                x:(CGFloat)x
                y:(CGFloat)y
            width:(CGFloat)width
           height:(CGFloat)height
        threshold:(int)threshold;
+ (BOOL)drawImage:(NSString *)file
        threshold:(int)threshold;

/**
 * @brief   打印图像。
 *
 * @param   image       图像对象。
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   threshold   图像转成打印用黑白图像的灰度阀值。
 1～255 表示灰度阀值，灰度值>=该阀值的点将被当作白点而丌打印；
 256 表示将图像转成灰度图片之后再打印，灰度点向黑白点的转换由打印机驱劢来完成；
 0/257 表示直接采用图像原始颜色进行打印，原始颜色向黑白色的转换由打印机驱劢来完成。
 对于打印二维码图片，建议灰度阀值设置为192；
 对于打印LOGO等图片，建议灰度阀值设置为0。
 *
 * @return  成功与否。
 */
+ (BOOL)drawImageWithImage:(UIImage *)image
                         x:(CGFloat)x
                         y:(CGFloat)y
                     width:(CGFloat)width
                    height:(CGFloat)height
                 threshold:(int)threshold;
+ (BOOL)drawImageWithImage:(UIImage *)image
                 threshold:(int)threshold;

/**
 * @brief   打印直线。
 *
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 *
 * @return  成功与否。
 */
+ (BOOL)drawLineWithX:(CGFloat)x
                    y:(CGFloat)y
                width:(CGFloat)width
               height:(CGFloat)height;

/**
 * @brief   打印矩形。
 *
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   lineWidth   线条宽度，单位由scaleUnit指定。
 * @param   isFilled    是否填充。
 *
 * @return  成功与否。
 */
+ (BOOL)drawRectangleWithX:(CGFloat)x
                         y:(CGFloat)y
                     width:(CGFloat)width
                    height:(CGFloat)height
                 lineWidth:(CGFloat)lineWidth
                  isFilled:(BOOL)isFilled;

/**
 * @brief   打印圆角矩形。
 *
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   lineWidth   线条宽度，单位由scaleUnit指定。
 * @param   radius      圆角的半径，单位由scaleUnit指定。
 * @param   isFilled    是否填充。
 *
 * @return  成功与否。
 */
+ (BOOL)drawRoundRectangleWithX:(CGFloat)x
                              y:(CGFloat)y
                          width:(CGFloat)width
                         height:(CGFloat)height
                      lineWidth:(CGFloat)lineWidth
                         radius:(CGFloat)radius
                       isFilled:(BOOL)isFilled;

/**
 * @brief   打印椭圆。
 *
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   lineWidth   线条宽度，单位由scaleUnit指定。
 * @param   isFilled    是否填充。
 *
 * @return  成功与否。
 */
+ (BOOL)drawEllipseWithX:(CGFloat)x
                       y:(CGFloat)y
                   width:(CGFloat)width
                  height:(CGFloat)height
               lineWidth:(CGFloat)lineWidth
                isFilled:(BOOL)isFilled;

/**
 * @brief   打印正圆。
 *
 * @param   x           打印对象的位置，单位由scaleUnit指定。
 * @param   y           打印对象的位置，单位由scaleUnit指定。
 * @param   width       打印对象的尺寸，单位由scaleUnit指定。
 * @param   height      打印对象的尺寸，单位由scaleUnit指定。
 * @param   lineWidth   线条宽度，单位由scaleUnit指定。
 * @param   isFilled    是否填充。
 *
 * @return  成功与否。
 */
+ (BOOL)drawCircleWithX:(CGFloat)x
                      y:(CGFloat)y
                  width:(CGFloat)width
                 height:(CGFloat)height
              lineWidth:(CGFloat)lineWidth
               isFilled:(BOOL)isFilled;

@end
