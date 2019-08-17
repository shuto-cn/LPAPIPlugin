//
//  AMLPAPI.m
//  LPAPICordovaTest
//
//  Created by 蔡俊杰 on 2017/12/14.
//

#import "AMLPAPI.h"

#import "LPAPI.h"

@implementation AMLPAPI

- (BOOL)isCommandTrue:(CDVInvokedUrlCommand *)command
                count:(int)count
{
    if ([[command arguments] count] >= count)
    {
        return YES;
    }
    else
    {
        //如果没有入参,则回调JS失败函数
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR 
                                                          messageAsString:@"没有参数"];
        [[self commandDelegate] sendPluginResult:pluginResult 
                                      callbackId:[command callbackId]];
        
        return NO;
    }
}

- (void)setSupportPrefixs:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:1])
    {
        [LPAPI setSupportPrefixs:[command arguments]];
    }
}

- (void)connectingPrinterName:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                      messageAsString:[LPAPI connectingPrinterName]];
    [[self commandDelegate] sendPluginResult:pluginResult 
                                  callbackId:[command callbackId]];
}

- (void)scanPrinters:(CDVInvokedUrlCommand *)command
{
    [LPAPI scanPrinters:^(NSArray *scanedPrinterNames) 
     {
         CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                            messageAsArray:scanedPrinterNames];
         [[self commandDelegate] sendPluginResult:pluginResult 
                                       callbackId:[command callbackId]];
     }];
}

- (void)openPrinter:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:1])
    {
        [LPAPI openPrinter:[[command arguments] objectAtIndex:0]
                completion:^(BOOL isSuccess)
         {
             CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                                 messageAsBool:isSuccess];
             [[self commandDelegate] sendPluginResult:pluginResult 
                                           callbackId:[command callbackId]];
         }];
    }
}

- (void)closePrinter:(CDVInvokedUrlCommand *)command;
{
    [LPAPI closePrinter];
}

- (void)startPrint:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:4])
    {
        [LPAPI startPrint:[[[command arguments] objectAtIndex:0] floatValue]
                   height:[[[command arguments] objectAtIndex:1] floatValue]
              orientation:[[[command arguments] objectAtIndex:2] intValue]
                scaleUnit:[[[command arguments] objectAtIndex:3] intValue]
                  jobName:nil];
    }
}

- (void)commitPrint:(CDVInvokedUrlCommand *)command
{
    [LPAPI commitPrint:^(BOOL isSuccess)
     {
         CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                             messageAsBool:isSuccess];
         [[self commandDelegate] sendPluginResult:pluginResult 
                                       callbackId:[command callbackId]];
     }];
}

- (void)setItemOrientation:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:1])
    {
        [LPAPI setItemOrientation:[[[command arguments] objectAtIndex:0] intValue]];
    }
}

- (void)setItemHorizontalAlignment:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:1])
    {
        [LPAPI setItemHorizontalAlignment:[[[command arguments] objectAtIndex:0] intValue]];
    }
}

- (void)setItemVerticalAlignment:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:1])
    {
        [LPAPI setItemVerticalAlignment:[[[command arguments] objectAtIndex:0] intValue]];
    }
}

- (void)drawText:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:8])
    {
        [LPAPI drawText:[[command arguments] objectAtIndex:0] 
                      x:[[[command arguments] objectAtIndex:1] floatValue] 
                      y:[[[command arguments] objectAtIndex:2] floatValue]
                  width:[[[command arguments] objectAtIndex:3] floatValue]
                 height:[[[command arguments] objectAtIndex:4] floatValue]
               fontName:[[command arguments] objectAtIndex:5]
             fontHeight:[[[command arguments] objectAtIndex:6] floatValue]
              fontStyle:[[[command arguments] objectAtIndex:7] intValue]];
    }
}

- (void)drawBarcode:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:9])
    {
        [LPAPI drawBarcode:[[command arguments] objectAtIndex:0] 
                         x:[[[command arguments] objectAtIndex:1] floatValue] 
                         y:[[[command arguments] objectAtIndex:2] floatValue]
                     width:[[[command arguments] objectAtIndex:3] floatValue]
                    height:[[[command arguments] objectAtIndex:4] floatValue]
                  fontName:[[command arguments] objectAtIndex:5]
                fontHeight:[[[command arguments] objectAtIndex:6] floatValue]
                 fontStyle:[[[command arguments] objectAtIndex:7] intValue]
                  textFlag:[[[command arguments] objectAtIndex:8] intValue]];
    }
}

- (void)drawQRCode:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:4])
    {
        [LPAPI drawQRCode:[[command arguments] objectAtIndex:0] 
                        x:[[[command arguments] objectAtIndex:1] floatValue] 
                        y:[[[command arguments] objectAtIndex:2] floatValue]
                    width:[[[command arguments] objectAtIndex:3] floatValue]];
    }
}

- (void)drawImage:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:6])
    {
        [LPAPI drawImage:[[command arguments] objectAtIndex:0] 
                       x:[[[command arguments] objectAtIndex:1] floatValue] 
                       y:[[[command arguments] objectAtIndex:2] floatValue]
                   width:[[[command arguments] objectAtIndex:3] floatValue]
                  height:[[[command arguments] objectAtIndex:4] floatValue]
               threshold:[[[command arguments] objectAtIndex:5] intValue]];
    }
}

- (void)drawFullImage:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:2])
    {
        [LPAPI drawImage:[[command arguments] objectAtIndex:0] 
               threshold:[[[command arguments] objectAtIndex:1] intValue]];
    }
}

- (void)drawImageWithImage:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:6])
    {
        [LPAPI drawImageWithImage:[[command arguments] objectAtIndex:0] 
                                x:[[[command arguments] objectAtIndex:1] floatValue] 
                                y:[[[command arguments] objectAtIndex:2] floatValue]
                            width:[[[command arguments] objectAtIndex:3] floatValue]
                           height:[[[command arguments] objectAtIndex:4] floatValue]
                        threshold:[[[command arguments] objectAtIndex:5] intValue]];
    }
}

- (void)drawFullImageWithImage:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:2])
    {
        [LPAPI drawImageWithImage:[[command arguments] objectAtIndex:0] 
                        threshold:[[[command arguments] objectAtIndex:1] intValue]];
    }
}

- (void)drawLine:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:4])
    {
        [LPAPI drawLineWithX:[[[command arguments] objectAtIndex:0] floatValue] 
                           y:[[[command arguments] objectAtIndex:1] floatValue]
                       width:[[[command arguments] objectAtIndex:2] floatValue]
                      height:[[[command arguments] objectAtIndex:3] floatValue]];
    }
}

- (void)drawRectangle:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:6])
    {
        [LPAPI drawRectangleWithX:[[[command arguments] objectAtIndex:0] floatValue] 
                                y:[[[command arguments] objectAtIndex:1] floatValue]
                            width:[[[command arguments] objectAtIndex:2] floatValue]
                           height:[[[command arguments] objectAtIndex:3] floatValue]
                        lineWidth:[[[command arguments] objectAtIndex:4] floatValue]
                         isFilled:[[[command arguments] objectAtIndex:5] boolValue]];
    }
}

- (void)drawRoundRectangle:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:7])
    {
        [LPAPI drawRoundRectangleWithX:[[[command arguments] objectAtIndex:0] floatValue] 
                                     y:[[[command arguments] objectAtIndex:1] floatValue]
                                 width:[[[command arguments] objectAtIndex:2] floatValue]
                                height:[[[command arguments] objectAtIndex:3] floatValue]
                             lineWidth:[[[command arguments] objectAtIndex:4] floatValue]
                                radius:[[[command arguments] objectAtIndex:5] floatValue]
                              isFilled:[[[command arguments] objectAtIndex:6] boolValue]];
    } 
}

- (void)drawEllipse:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:6])
    {
        [LPAPI drawEllipseWithX:[[[command arguments] objectAtIndex:0] floatValue] 
                              y:[[[command arguments] objectAtIndex:1] floatValue]
                          width:[[[command arguments] objectAtIndex:2] floatValue]
                         height:[[[command arguments] objectAtIndex:3] floatValue]
                      lineWidth:[[[command arguments] objectAtIndex:4] floatValue]
                       isFilled:[[[command arguments] objectAtIndex:5] boolValue]];
    }
}

- (void)drawCircle:(CDVInvokedUrlCommand *)command
{
    if ([self isCommandTrue:command count:6])
    {
        [LPAPI drawCircleWithX:[[[command arguments] objectAtIndex:0] floatValue] 
                             y:[[[command arguments] objectAtIndex:1] floatValue]
                         width:[[[command arguments] objectAtIndex:2] floatValue]
                        height:[[[command arguments] objectAtIndex:3] floatValue]
                     lineWidth:[[[command arguments] objectAtIndex:4] floatValue]
                      isFilled:[[[command arguments] objectAtIndex:5] boolValue]];
    }
}

@end
