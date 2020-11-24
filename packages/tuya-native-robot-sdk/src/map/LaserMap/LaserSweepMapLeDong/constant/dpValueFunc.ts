import dpCodes from './dpCodes';

const { dpCodesEnum, dpCodesValueEnum } = dpCodes;

// const robotStatusCode = dpCodesEnum.robotState;
const robotStatusEnum = dpCodesValueEnum.robotStatus;

// const cleanModeCode = dpCodesEnum.cleanMode;
const cleanModeEnum = dpCodesValueEnum.cleanMode;

function isPaused(robotStatus: string) {
  return [robotStatusEnum.pause, robotStatusEnum.fault].includes(robotStatus);
}
/**  */
function robotStatusCleaning(robotStatus: string) {
  return [robotStatusEnum.totaling, robotStatusEnum.pointing, robotStatusEnum.areaing].includes(
    robotStatus
  );
}

function robotStatusPointing(robotStatus: string, workMode: string) {
  return workMode === cleanModeEnum.pose && robotStatus === robotStatusEnum.pointing;
}

function robotStatusAutoRunPause(robotStatus: string, workMode: string) {
  return workMode === cleanModeEnum.smart && isPaused(robotStatus);
}

function robotStatusPointingPause(robotStatus: string, workMode: string) {
  return workMode === cleanModeEnum.pose && isPaused(robotStatus);
}

function robotStatusAreaingPause(robotStatus: string, workMode: string) {
  return workMode === cleanModeEnum.zone && isPaused(robotStatus);
}

function robotStatusAreaing(robotStatus: string, workMode: string) {
  return workMode === cleanModeEnum.zone && robotStatus === robotStatusEnum.areaing;
}

function robotStatusAutoRun(robotStatus: string, workMode: string) {
  return workMode === cleanModeEnum.smart && robotStatus === robotStatusEnum.totaling;
}

function robotStatusPause(robotStatus: string) {
  return isPaused(robotStatus);
}

function robotStatusIdle(robotStatus: string) {
  return robotStatus === robotStatusEnum.idle;
}

function robotStatusToCharing(robotStatus: string) {
  return robotStatus === robotStatusEnum.toCharge;
}

function robotStatusCharing(robotStatus: string) {
  return robotStatus === robotStatusEnum.chargring;
}

function robotStatusFullCharge(robotStatus: string) {
  return robotStatus === robotStatusEnum.fullCharge;
}

function robotStatusFault(robotStatus: string) {
  return robotStatus === robotStatusEnum.fault;
}

function robotStatusDormant(robotStatus: string) {
  return robotStatus === robotStatusEnum.dormant;
}

export default {
  robotStatusCleaning,
  robotStatusAreaing,
  robotStatusAreaingPause,
  robotStatusPointing,
  robotStatusPointingPause,
  robotStatusAutoRun,
  robotStatusAutoRunPause,

  robotStatusCharing,
  robotStatusToCharing,
  robotStatusFullCharge,

  robotStatusPause,
  robotStatusIdle,
  robotStatusFault,
  robotStatusDormant,
};
