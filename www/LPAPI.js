    /**
     * Created by HuDianxing on 2017-12-16.
     *
     * 德佟电子标签打印机 JavaScript 接口的封装。
     *
     * Copyright(C) 2011~2017, 上海道臻信息技术有限公司
     *
     */
    var api = {};
    var LPAPIPlugin = window.LPAPIPlugin;
    var lpapiModel = window.lpapiModel;

    /***************************************************************************
     * 打印机的打开与断开操作。
     **************************************************************************/

    /**
     * 以字符串的形式返回已经安装过的所有打印机名称，不同打印机名称间以英文","分隔。
     * @param names 打印机型号，
     *      空字符串表示返回所有型号的打印机
     *      要获取多个型号的打印机，多个型号之间可以用";"进行分割；
     * @param success 成功回调函数；
     * @param fail 失败回调函数；
     * 平台支持：Android+IOS；
     */
    api.getAllPrinters = function (names, success, fail) {
        if (typeof names === "function") {
            fail = success;
            success = names;
            names = "";
        }

        if (Mobile.isAndroid()) {
            LPAPIPlugin.getAllPrinters({
                name: names
            }, success);
        } else if (Mobile.isIOS()) {
            // 设置型号限制
            if (names) {
               var nameKeys = names.split(";");
            	lpapiModel.jsSetSupportPrefixs(nameKeys);
            }
               lpapiModel.jsScanPrinters(function(array){
                                         var str = array.join(",");
                                         success(str);
                                         }, fail);
        }
    };

    /**
     * 以数组的形式返货制定型号打印机的详细信息；
     * @param names 打印机型号(或者成功回调函数)，
     *      空字符串表示返回所有型号的打印机
     *      要获取多个型号的打印机，多个型号之间可以用";"进行分割；
     * @param callback 结果回调函数；
     * 平台支持：Android；
     */
    api.getAllPrinterAddresses = function (names, callback) {
        if (typeof names === "function") {
            callback = names;
            names = "";
        }

        if (Mobile.isAndroid()) {
            LPAPIPlugin.getAllPrinterAddresses({
                name: names
            }, callback);
        }
    };

    /**
     * 获取默认打印机详细信息；
     *
     * @param names 所要获取打印机的型号，不指定则获取所有型号；
     * @param callback 结果回调函数；
     * 平台支持：Android；
     */
    api.getFirstPrinter = function (names, callback) {
    	if (typeof names === "function"){
    		callback = names;
    		names = "";
    	}
    	
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getFirstPrinter({
            	name : names
            }, callback);
        }
    };

    /**
     * 打开指定名称的打印机(异步调用)。
     * @param printerName
     *            打印机名称。打印机名称类型：
     *            1、空字符串：打开当前客户端系统上的第一个支持的打印机；
     *            2、打印机型号：例如：DT20S；
     *            3、打印机名称：例如：DT20S-60901687;
     *            4、MAC地址：打开指定地址的打印机，例如：00:18:E4:0C:68:CA。
     * @param success 成功回调函数；
     * @param fail 失败回调函数；
     * 平台支持：Android+IOS；
     */
    api.openPrinter = function (printerName, success, fail) {
        var printer = printerName;
        var successCallback = success;
        var failCallback = fail;
        if (typeof printerName === "function") {
            successCallback = printerName;
            failCallback = success;
            printer = null;
        }

        if (Mobile.isAndroid()) {
            LPAPIPlugin.openPrinter({
                name: printer
            }, successCallback, failCallback);
        } else if (Mobile.isIOS()) {
            lpapiModel.jsOpenPrinter(success, fail, [printerName]);
        }
    };

    /**
     * 断开当前打印机的连接。
     * 平台支持：Android+IOS；
     */
    api.closePrinter = function () {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.closePrinter();
        } else if (Mobile.isIOS()) {
            lpapiModel.jsClosePrinter();
        }
    };

    /**
     * 得到当前使用的打印机名称。
     *
     * @return 如果已连接打印机，则返回当前使用的打印机名称，否则返回空字符串。
     * 平台支持：Android+IOS；
     */
    api.getPrinterName = function (success, fail) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getPrinterName(success);
        } else if (Mobile.isIOS()) {
            lpapiModel.jsConnectingPrinterName(success, fail);
        }
    };

    /**
     * 获取当前打印机的链接信息；
     *
     * @param success 结果回调函数；
     * 平台支持：Android；
     */
    api.getPrinterState = function (success) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getPrinterState(success);
        }
    };

    /**
     * 获取当前已连接打印机的详细信息；
     *
     * @param success 结果回调函数；
     * 平台支持：Android；
     */
    api.getPrinterInfo = function (success) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getPrinterInfo(success);
        }
    };

    /**
     * 判断当前打印机是否打开（连接成功）？
     * 平台支持：Android；
     */
    api.isPrinterOpened = function (success, fail) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.isPrinterOpened(success, fail);
        }
    };

    /**
     * 重新连接上次连接的打印机（异步调用）。
     *
     * @return 异步连接操作是否成功提交？
     *        注意：返回成功仅仅表示操作被提交成功，并不代表着连接成功了，具体的连接结果会通过回调函数给出通知。
     * 平台支持：Android；
     */
    api.reopenPrinter = function (success, fail) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.reopenPrinter(success, fail);
        }
    };

    /***************************************************************************
     * 打印任务的开始，分页，结束等操作。
     **************************************************************************/

    /**
     * 以指定的参数，开始一个打印任务。
     *
     * @param width
     *            标签宽度（单位mm）。
     * @param height
     *            标签高度（单位mm）。
     * @param orientation
     *            标签打印方向。0：不旋转；90：顺时针旋转90度；180：旋转180度；270：逆时针旋转90度。
     * @return 成功与否？
     * 平台支持：Android+IOS；
     */
    api.startJob = function (width, height, orientation) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.startJob({
                width: width,
                height: height,
                orientation: orientation
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsStartPrint([width, height, orientation, 1]);
        }
    };

    /**
     * 开始一个打印页面。
     * @param success 成功回调函数；
     * @param fail 失败回调函数；
     * 平台支持：Android；
     */
    api.startPage = function (success, fail) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.startPage(success, fail);
        }
    };

    /**
     * 结束一个打印页面。
     * 平台支持：Android；
     */
    api.endPage = function () {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.endPage();
        }
    };

    /**
     * 结束绘图任务。
     * 调用endJob()后，并未将打印任务提交给打印机，但是可以通过调用getJobPages(),然后以图片形式获取打印任务；
     * 平台支持：Android；
     */
    api.endJob = function () {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.endJob();
        }
    };

    /**
     * 取消绘图任务，用于取消任务提交前的所有绘制操作。
     * 平台支持：Android
     */
    api.abortJob = function () {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.abortJob();
        }
    };

    /**
     * 提交打印数据，进行真正的打印。
     * @param success 成功回调函数；
     * @param fail 失败回调函数；
     * 平台支持：Android+IOS；
     */
    api.commitJob = function (success, fail) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.commitJob(success, fail);
        } else if (Mobile.isIOS()) {
            lpapiModel.jsCommitPrint(success, fail);
        }
    };

    /**
     * 取消当前的打印操作，用于在提交打印任务后执行取消操作。
     * 平台支持：Android；
     */
    api.cancel = function () {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.cancel();
        }
    };

    /**
     * 调用函数endJob() 之后可以调用该函数，获取base64图片格式的打印任务；
     * @param success 数据获取成功回调函数(返回值);
     * 平台支持：Android；
     */
    api.getJobPages = function (success) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getJobPages(success);
        }
    };

    /**
     * 打印base64格式的图片对象
     * @param image base64格式图片或者URL路径；
     * @param success 打印成功回调；
     * @param fail 打印失败回调；
     * 平台支持：Android；
     */
    api.printImage = function (image, success, fail) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.printImage({
                image: image || ""
            }, success, fail);
        }
    };

    /***************************************************************************
     * 打印参数设置。
     **************************************************************************/

    /**
     * 得到当前打印动作的顺时针旋转角度。
     *
     * @param success 成功回调函数（返回值）；
     * 当前打印动作的顺时针旋转角度（0，90，180，270）。
     * 平台支持：Android；
     */
    api.getItemOrientation = function (success) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getItemOrientation(success);
        }
    };

    /**
     * 设置打印动作的旋转角度。
     *
     * @param orientation
     *            orientation: 旋转角度。参数描述如下：
     *            0：不旋转；
     *            90：顺时针旋转90度；
     *            180：旋转180度；
     *            270：逆时针旋转90度。
     * 平台支持：Android + IOS;
     */
    api.setItemOrientation = function (orientation) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.setItemOrientation({
                orientation: orientation || 0
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsSetItemOrientation([orientation]);
        }
    };

    /**
     * 得到当前打印动作的水平对齐方式。
     *
     * @param success 成功回调函数（返回值）；
     *  水平对齐方式值如下：
     *         0：水平居左；
     *         1：水平居中；
     *         2：水平居右；
     * 平台支持：Android；
     */
    api.getItemHorizontalAlignment = function (success) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getItemHorizontalAlignment(success);
        }
    };

    /**
     * 设置打印动作的水平对齐方式。
     *
     * @param alignment
     *            水平对齐方式。参数描述如下：
     *            0：水平居左（默认方式）；
     *            1：水平居中；
     *            2：水平居右。
     * 平台支持：Android + IOS；
     */
    api.setItemHorizontalAlignment = function (alignment) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.setItemHorizontalAlignment({
                alignment: alignment || 0
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsSetItemHorizontalAlignment([alignment]);
        }
    };

    /**
     * 得到当前打印动作的垂直对齐方式。
     *
     * @param success 成功回调函数（返回值）；
     *  后续打印动作的垂直对齐方式。返回结果描述如下：
     *         0：垂直居上；
     *         1：垂直居中；
     *         2：垂直居下；
     * 平台支持：Android；
     */
    api.getItemVerticalAlignment = function (success) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getItemVerticalAlignment(success);
        } else if (Mobile.isIOS()) {

        }
    };

    /**
     * 设置打印动作的垂直对齐方式。
     *
     * @param alignment
     *            垂直对齐方式，参数描述如下：
     *            0：垂直居上（默认方式）；
     *            1：垂直居中；
     *            2：垂直居下。
     * 平台支持：Android + IOS；
     */
    api.setItemVerticalAlignment = function (alignment) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.setItemVerticalAlignment({
                alignment: alignment || 0
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsSetItemVerticalAlignment([alignment]);
        }
    };

    /**
     * 得到线条画笔对齐方式。
     *
     * @return 线条画笔对齐方式，<br>
     *         数值为以下两者之一：<br>
     *         PenAlignment.CENTER：绘制的线以指定的位置为中央；<br>
     *         PenAlignment.INSET：绘制的线在指定的位置内侧。<br>
     * 平台支持：Android；
     */
    api.getItemPenAlignment = function (success) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.getItemPenAlignment(success);
        }
    };

    /**
     * 设置线条画笔对齐方式。
     *
     * @param penAlignment
     *            线条画笔对齐方式，<br>
     *            数值为以下两者之一：<br>
     *            PenAlignment.CENTER：绘制的线以指定的位置为中央； <br>
     *            PenAlignment.INSET：绘制的线在指定的位置内侧。
     * 平台支持：Android；
     */
    api.setItemPenAlignment = function (penAlignment) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.setItemPenAlignment({
                alignment: penAlignment
            });
        }
    };

    /***************************************************************************
     * 打印对象的绘制操作。
     **************************************************************************/

    /**
     * 打印文本。
     *
     * @param text
     *            文本内容。
     * @param x
     *            打印对象的位置(单位mm)。
     * @param y
     *            打印对象的位置(单位mm)。
     * @param width
     *            打印对象的宽度(单位mm)。
     * @param height
     *            打印对象的高度(单位mm)。
     *            height 为 0 时，真正的打印文本高度会根据内容来扩展；否则当指定的高度不足以打印指定的文本时，会自动缩小字体来适应指定的高度进行文本打印。
     * @param fontHeight
     *            文本的字体高度(单位mm)。
     * @param fontStyle
     *            文本的字体风格（可按位组合），可以不指定，默认为0（正常）。0：正常；1：粗体；2：斜体；3：粗斜体 ；4：下划线；8：删除线。
     * @return 打印成功与否？
     */
    api.drawText = function (text, x, y, width, height, fontHeight, fontStyle) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawText({
                text: text,
                x: x || 0,
                y: y || 0,
                width: width || 0,
                height: height || 0,
                fontHeight: fontHeight || 0,
                fontStyle: fontStyle || 0
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawText([text, x, y, width, height, "", fontHeight, fontStyle]);
        }
    };

    /**
     * 以指定的线宽，打印矩形框。
     *
     * @param x
     *            绘制的矩形框的左上角水平位置（单位mm）。
     * @param y
     *            绘制的矩形框的左上角垂直位置（单位mm）。
     * @param width
     *            绘制的矩形框的水平宽度（单位mm）。
     * @param height
     *            绘制的矩形框的垂直高度（单位mm）。
     * @param lineWidth
     *            矩形框的线宽（单位mm）。矩形框的线宽是向矩形框内部延伸的。
     * @return 打印成功与否？
     */
    api.drawRectangle = function (x, y, width, height, lineWidth) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawRectangle({
                x: x,
                y: y,
                width: width,
                height: height,
                lineWidth: lineWidth
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawRectangle([x, y, width, height, lineWidth, false]);
        }
    };

    /**
     * 打印填充的矩形框。
     *
     * @param x
     *            绘制的填充矩形框的左上角水平位置（单位mm）。
     * @param y
     *            绘制的填充矩形框的左上角垂直位置（单位mm）。
     * @param width
     *            绘制的填充矩形框的水平宽度（单位mm）。
     * @param height
     *            绘制的填充矩形框的垂直高度（单位mm）。
     * @return 打印成功与否？
     */
    api.fillRectangle = function (x, y, width, height) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.fillRectangle({
                x: x,
                y: y,
                width: width,
                height: height
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawRectangle([x, y, width, height, 0.1, true]);
        }
    };

    /**
     * 以指定的线宽，打印圆角矩形框。
     *
     * @param x
     *            绘制的圆角矩形框的左上角水平位置（单位mm）。
     * @param y
     *            绘制的圆角矩形框的左上角垂直位置（单位mm）。
     * @param width
     *            绘制的圆角矩形框的水平宽度（单位mm）。
     * @param height
     *            绘制的圆角矩形框的垂直高度（单位mm）。
     * @param cornerWidth
     *            圆角宽度（单位mm）。
     * @param cornerHeight
     *            圆角高度（单位mm）。
     * @param lineWidth
     *            圆角矩形框的线宽（单位mm）。圆角矩形框的线宽是向圆角矩形框内部延伸的。
     * @return 打印成功与否？
     */
    api.drawRoundRectangle = function (x, y, width, height, cornerWidth, cornerHeight, lineWidth) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawRoundRectangle({
                x: x,
                y: y,
                width: width,
                height: height,
                cornerWidth: cornerWidth,
                cornerHeight: cornerHeight,
                lineWidth: lineWidth
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawRoundRectangle([x, y, width, height, lineWidth, cornerWidth, false]);
        }
    };

    /**
     * 打印填充的圆角矩形框。
     *
     * @param x
     *            绘制的填充圆角矩形框的左上角水平位置（单位mm）。
     * @param y
     *            绘制的填充圆角矩形框的左上角垂直位置（单位mm）。
     * @param width
     *            绘制的填充圆角矩形框的水平宽度（单位mm）。
     * @param height
     *            绘制的填充圆角矩形框的垂直高度（单位mm）。
     * @param cornerWidth
     *            圆角宽度（单位mm）。
     * @param cornerHeight
     *            圆角高度（单位mm）。
     * @return 打印成功与否？
     */
    api.fillRoundRectangle = function (x, y, width, height, cornerWidth, cornerHeight) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.fillRoundRectangle({
                x: x,
                y: y,
                width: width,
                height: height,
                cornerWidth: cornerWidth,
                cornerHeight: cornerHeight
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawRoundRectangle([x, y, width, height, 0.1, cornerWidth, true]);
        }
    };

    /**
     * 以指定的线宽，打印椭圆/圆。
     *
     * @param x
     *            绘制的椭圆的左上角水平位置（单位mm）。
     * @param y
     *            绘制的椭圆的左上角垂直位置（单位mm）。
     * @param width
     *            绘制的椭圆的水平宽度（单位mm）。
     * @param height
     *            绘制的椭圆的垂直高度（单位mm）。
     * @param lineWidth
     *            椭圆的线宽（单位mm）。椭圆的线宽是向椭圆内部延伸的。
     * @return 打印成功与否？
     */
    api.drawEllipse = function (x, y, width, height, lineWidth) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawEllipse({
                x: x,
                y: y,
                width: width,
                height: height,
                lineWidth: lineWidth
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawEllipse([x, y, width, height, lineWidth, false]);
        }
    };

    /**
     * 打印填充的椭圆/圆。
     *
     * @param x
     *            绘制的填充椭圆的左上角水平位置（单位mm）。
     * @param y
     *            绘制的填充椭圆的左上角垂直位置（单位mm）。
     * @param width
     *            绘制的填充椭圆的水平宽度（单位mm）。
     * @param height
     *            绘制的填充椭圆的垂直高度（单位mm）。
     * @return 打印成功与否？
     */
    api.fillEllipse = function (x, y, width, height) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.fillEllipse({
                x: x,
                y: y,
                width: width,
                height: height
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawEllipse([x, y, width, height, 0.1, true]);
        }
    };

    /**
     * 以指定的线宽，打印圆。
     *
     * @param x
     *            绘制的圆形的X轴圆心位置（单位mm）。
     * @param y
     *            绘制的圆形的Y轴圆心位置（单位mm）。
     * @param radius
     *            绘制的圆的半径（单位mm）。
     * @param lineWidth
     *            圆的线宽（单位mm）。圆的线宽是向圆内部延伸的。
     * @return 打印成功与否？
     */
    api.drawCircle = function (x, y, radius, lineWidth) {
        x = x - radius;
        y = y - radius;

        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawCircle({
                x: x,
                y: y,
                radius: radius,
                lineWidth: lineWidth
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawCircle([x, y, radius * 2, radius * 2, lineWidth, false]);
        }
    };

    /**
     * 打印填充的圆。
     *
     * @param x
     *            绘制的圆形的X轴圆心位置（单位mm）。
     * @param y
     *            绘制的圆形的Y轴圆心位置（单位mm）。
     * @param radius
     *            绘制的填充圆的半径（单位mm）。
     * @return 打印成功与否？
     */
    api.fillCircle = function (x, y, radius) {
        x = x - radius;
        y = y - radius;

        if (Mobile.isAndroid()) {
            LPAPIPlugin.fillCircle({
                x: x,
                y: y,
                radius: radius
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawCircle([x, y, radius * 2, radius * 2, 0.1, true]);
        }
    };

    /**
     * 打印线（直线/斜线）。
     *
     * @param x1
     *            线的起点的水平位置（单位mm）。
     * @param y1
     *            线的起点的垂直位置（单位mm）。
     * @param x2
     *            线的终点的水平位置（单位mm）。
     * @param y2
     *            线的终点的垂直位置（单位mm）。
     * @param lineWidth
     *            线宽（单位mm）。线宽是向线的下方延伸的。
     * @return 打印成功与否？
     */
    api.drawLine = function (x1, y1, x2, y2, lineWidth) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawLine({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                lineWidth: lineWidth
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawLine([x1, y1, x2 - x1, y2 - y1]);
        }
    };

    /**
     * 打印点划线。
     *
     * @param x1
     *            线的起点的水平位置（单位mm）。
     * @param y1
     *            线的起点的垂直位置（单位mm）。
     * @param x2
     *            线的终点的水平位置（单位mm）。
     * @param y2
     *            线的终点的垂直位置（单位mm）。
     * @param lineWidth
     *            线宽（单位mm）。线宽是向线的下方延伸的。
     * @param dashLen
     *            点划线线段长度的数组（单位mm）。
     * @param dashCount
     *            点划线线段长度数组的元素个数。
     * @return 打印成功与否。
     */
    api.drawDashLine = function (x1, y1, x2, y2, lineWidth, dashLen, dashCount) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawDashLine({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                lineWidth: lineWidth,
                dashLen: dashLen,
                dashCount: dashCount
            });
        } else if (Mobile.isIOS()) {

        }
    };

    /**
     * 打印点划线。
     *
     * @param x1
     *            线的起点的水平位置（单位mm）。
     * @param y1
     *            线的起点的垂直位置（单位mm）。
     * @param x2
     *            线的终点的水平位置（单位mm）。
     * @param y2
     *            线的终点的垂直位置（单位mm）。
     * @param lineWidth
     *            线宽（单位mm）。线宽是向线的下方延伸的。
     * @param dashLen1
     *            点划线第一段的长度（单位mm）。
     * @param dashLen2
     *            点划线第二段的长度（单位mm）。
     * @return 打印成功与否。
     */
    api.drawDashLine2 = function (x1, y1, x2, y2, lineWidth, dashLen1, dashLen2) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawDashLine({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                lineWidth: lineWidth,
                dashLen1: dashLen1,
                dashLen2: dashLen2
            });
        } else if (Mobile.isIOS()) {

        }
    };

    /**
     * 打印点划线。
     *
     * @param x1
     *            线的起点的水平位置（单位mm）。
     * @param y1
     *            线的起点的垂直位置（单位mm）。
     * @param x2
     *            线的终点的水平位置（单位mm）。
     * @param y2
     *            线的终点的垂直位置（单位mm）。
     * @param lineWidth
     *            线宽（单位mm）。线宽是向线的下方延伸的。
     * @param dashLen1
     *            点划线第一段的长度（单位mm）。
     * @param dashLen2
     *            点划线第二段的长度（单位mm）。
     * @param dashLen3
     *            点划线第三段的长度（单位mm）。
     * @param dashLen4
     *            点划线第四段的长度（单位mm）。
     * @return 打印成功与否。
     */
    api.drawDashLine4 = function (x1, y1, x2, y2, lineWidth, dashLen1, dashLen2, dashLen3, dashLen4) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawDashLine({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                lineWidth: lineWidth,
                dashLen1: dashLen1,
                dashLen2: dashLen2,
                dashLen3: dashLen3,
                dashLen4: dashLen4
            });
        } else if (Mobile.isIOS()) {

        }
    };

    /**
     * 打印一维条码。
     *
     * @param text
     *            需要绘制的一维条码的内容。
     * @param x
     *            绘制的一维条码的左上角水平位置（单位mm）。
     * @param y
     *            绘制的一维条码的左上角垂直位置（单位mm）。
     * @param width
     *            一维条码的整体显示宽度。
     * @param height
     *            一维条码的显示高度（包括供人识读文本）。
     * @param textHeight
     *            供人识读文本的高度（单位mm），建议为3毫米。
     * @param type
     *            一维条码的编码类型参考文档。
     * @return 打印成功与否？
     */
    api.drawBarcode = function (text, x, y, width, height, textHeight, type) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.draw1DBarcode({
                text: text,
                type: type,
                x: x,
                y: y,
                width: width,
                height: height,
                textHeight: textHeight
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawBarcode([text, x, y, width, height, "", textHeight, 0, 2]);
        }
    };

    /**
     * 打印 QRCode 二维码。
     *
     * @param text
     *            需要绘制的QRCode二维码的内容。
     * @param x
     *            绘制的QRCode二维码的左上角水平位置（单位mm）。
     * @param y
     *            绘制的QRCode二维码的左上角垂直位置（单位mm）。
     * @param width
     *            绘制的QRCode二维码的水平宽度（单位mm）。
     * @return 打印成功与否？
     */
    api.drawQRCode = function (text, x, y, width) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.draw2DQRCode({
                text: text,
                x: x,
                y: y,
                width: width
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawQRCode([text, x, y, width]);
        }
    };

    /**
     * 打印图片。
     *
     * @param image
     *            图片路径。
     * @param x
     *            打印对象在水平方向上的位置(单位mm)。
     * @param y
     *            打印对象在垂直方向上的位置(单位mm)。
     * @param width
     *            打印对象的宽度(单位mm)。
     * @param height
     *            打印对象的高度(单位mm)。
     * @param threshold
     *            绘制位图的灰度阀值。
     *            256 表示绘制灰度图片；
     *            257 表示绘制原色图片；
     *            0～255表示绘制黑白图片，原图颜色>=灰度阀值的点会被认为是白色，而原图颜色<灰度阀值的点会被认为是黑色。默认值为192。
     * @return 打印成功与否？
     */
    api.drawImage = function (image, x, y, width, height, threshold) {
        if (Mobile.isAndroid()) {
            LPAPIPlugin.drawImage({
                image: image || "",
                x: x || 0,
                y: y || 0,
                width: width || 0,
                height: height || 0,
                threshold: threshold || ""
            });
        } else if (Mobile.isIOS()) {
            lpapiModel.jsDrawImage([image, x, y, width, height, threshold]);
        }
    };

    /**用于判断当前js运行的环境是什么平台 */
    var Mobile = {
        isAndroid: function () {
            return navigator.userAgent.match(/Android/i);
        },
        isBlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        isIOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        isOpera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        isWindows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    module.exports = api;
