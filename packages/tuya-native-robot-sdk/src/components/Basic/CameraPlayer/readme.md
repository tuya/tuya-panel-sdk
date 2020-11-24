/\*\*

- 建立连接
-
- @param successCallback
- @param errorCallback
  \*/
  connect(Callback successCallback, Callback errorCallback)

/\*\*

- 断开连接，默认只发送成功的回调
-
- @param successCallback
- @param errorCallback
  \*/
  disconnect(Callback successCallback, Callback errorCallback)

/\*\*

- 开始预览
-
- @param successCallback
- @param errorCallback
  \*/
  startPreview(Callback successCallback, Callback errorCallback)

逻辑： 建立连接 然后开始预览

/\*\*

- 截图，保存路径和文件名 Native 处理
-
- @param successCallback
- @param errorCallback
  \*/
  snapShoot(Callback successCallback, Callback errorCallback)

/\*\*

- 开始录制，保存路径和文件名 Native 处理
-
- @param successCallback
- @param errorCallback
  \*/
  startRecord(Callback successCallback, Callback errorCallback)

/\*\*

- 停止录制
-
- @param successCallback
- @param errorCallback
  \*/
  stopRecord(Callback successCallback, Callback errorCallback)

/\*\*

- 开启对讲
-
- @param successCallback
- @param errorCallback
  \*/
  startTalk(Callback successCallback, Callback errorCallback)

/\*\*

- 停止对讲
-
- @param successCallback
- @param errorCallback
  \*/
  stopTalk(Callback successCallback, Callback errorCallback)

/\*\*

- 切换静音
-
- @param isMute
- @param successCallback
- @param errorCallback
  \*/
  enableMute(boolean isMute,Callback successCallback, Callback errorCallback)

/\*\*

- 判断是否静音
-
- @param callback
  \*/
  isMuting(Callback callback)

/\*\*

- 判断是否正在录制
-
- @param callback
  \*/
  isRecording(Callback callback)
