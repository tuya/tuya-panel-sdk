const email = require('../res/email.png');
const copy = require('../res/copy.png');
const message = require('../res/message.png');
const more = require('../res/more.png');
const weChat = require('../res/weChat.png');
export const initShareList = ['Message', 'Email', 'WeChat', 'Copy', 'More'];

export const getShareList: any = () => {
  const shareDataList = {
    message: {
      img: message,
      title: '短信',
    },
    email: {
      img: email,
      title: '邮件',
    },
    wechat: {
      img: weChat,
      title: '微信',
    },
    copy: {
      img: copy,
      title: '复制',
    },
    more: {
      img: more,
      title: '更多',
    },
  };
  return shareDataList;
};
