/* eslint-disable jest/no-done-callback */
import './setup';
import DPUtil from '../DPUtil';

describe('DPUtil 测试用例', () => {
  /** 模拟上报 */
  const mockReport = async (dps, type = 'dpData') => {
    const tuyaKit = require('tuya-panel-kit');
    const triggleListenCbs = tuyaKit.TYSdk.event.on.mock.calls.filter(
      call => call[0] === 'deviceDataChange'
    );

    await Promise.all(triggleListenCbs.map(([_, f]) => f({ type, payload: dps })));
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  test('测试 DPUtil 实例化', () => {
    const DP = DPUtil.createPageDp();
    expect(DP).toBeInstanceOf(DPUtil);
  });

  test('监听单个dp点 DP.listen', async () => {
    expect.assertions(2);
    const DP = DPUtil.createPageDp();
    const cb = jest.fn(value => {
      expect(value).toBe(666);
    });
    DP.listen('haha').reply(cb);
    await mockReport({ haha: 666 });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('监听dp数组 DP.listenDps', async () => {
    expect.assertions(2);
    const DP = DPUtil.createPageDp();
    const dpsCb = jest.fn(value => {
      expect(value).toEqual({ a: 1, b: 2 });
    });

    DP.listenDps(['a', 'b']).reply(dpsCb);

    await mockReport({ a: 1, b: 2, c: 3 });

    expect(dpsCb).toHaveBeenCalledTimes(1);
  });

  test('监听超时事件 timeout, 完成后销毁', async () => {
    const DP = DPUtil.createPageDp();

    const replyCb = jest.fn();
    const timeoutCb = jest.fn();

    /** 回复了就不触发 timeout 事件， 触发 reply 事件 */
    DP.listenWithinTime('hhh', 3 * 1000)
      .reply(replyCb)
      .timeout(timeoutCb);
    jest.clearAllTimers();
    await mockReport({ hhh: 666 });
    expect(replyCb).toHaveBeenCalledTimes(1);
    expect(timeoutCb).toHaveBeenCalledTimes(0);

    /** 未回复则触发 timeout 事件，不触发 reply 事件 */
    const timeoutCb2 = jest.fn();
    const replyCb2 = jest.fn();
    DP.listenWithinTime('jjj', 3 * 1000)
      .timeout(timeoutCb2)
      .reply(replyCb2);
    jest.runAllTimers();
    expect(timeoutCb2).toHaveBeenCalledTimes(1);
    expect(replyCb2).toHaveBeenCalledTimes(0);

    /** 单次事件 触发后将不在监听任何事件 */
    await mockReport({ hhh: 666, jjj: 777 });
    expect(replyCb).toHaveBeenCalledTimes(1);
    expect(timeoutCb).toHaveBeenCalledTimes(0);
    expect(timeoutCb2).toHaveBeenCalledTimes(1);
    expect(replyCb2).toHaveBeenCalledTimes(0);
  });

  // eslint-disable-next-line jest/no-done-callback
  test('监听 onChange 事件', async done => {
    expect.assertions(3);
    const DP = DPUtil.createPageDp();

    const onChangeCb = jest.fn(data => {
      expect(data.type).toBe('dpData');
      expect(data.payload).toEqual({ hah: 666 });
      done();
    });

    DP.onChange(onChangeCb);

    DP.mock({ hah: 666 });

    expect(onChangeCb).toHaveBeenCalledTimes(1);
  });

  test('多个 DP 实例监听', async () => {
    const DP1 = DPUtil.createPageDp();
    const DP2 = DPUtil.createPageDp();

    const reply1 = jest.fn();
    const reply2 = jest.fn();

    DP1.listen('test').reply(reply1);
    DP2.listen('test').reply(reply2);

    await mockReport({ test: 666 });

    expect(reply1).toHaveBeenCalledTimes(1);
    expect(reply2).toHaveBeenCalledTimes(1);

    DP1.off();

    await mockReport({ test: 777 });

    expect(reply1).toHaveBeenCalledTimes(1);
    expect(reply2).toHaveBeenCalledTimes(2);
  });

  test('dispatch 返回新的实例', () => {
    const DP = DPUtil.createPageDp();

    const obj = DP.dispatch({ test: 666 });

    expect(obj).toBeInstanceOf(DPUtil);
  });

  test('listen 事件过滤 type 非 dpData, onChange 事件透传', async done => {
    const DP = DPUtil.createPageDp();

    const reply = jest.fn();
    const onChangeCb = jest.fn(data => {
      expect(data.type).toBe('devInfo');
      done();
    });

    DP.listen('test').reply(reply);
    DP.onChange(onChangeCb);

    await mockReport({ test: 666 }, 'devInfo');

    expect(reply).toHaveBeenCalledTimes(0);
    expect(onChangeCb).toHaveBeenCalledTimes(1);
  });
});
