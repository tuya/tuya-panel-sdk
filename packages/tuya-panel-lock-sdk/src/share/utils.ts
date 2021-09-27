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
      title: 'message',
    },
    email: {
      img: email,
      title: 'email',
    },
    wechat: {
      img: weChat,
      title: 'weChat',
    },
    copy: {
      img: copy,
      title: 'copy',
    },
    more: {
      img: more,
      title: 'more',
    },
  };
  return shareDataList;
};
