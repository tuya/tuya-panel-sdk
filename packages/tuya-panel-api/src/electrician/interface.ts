export interface IGetLinkageDeviceList {
  gid: number;
  sourceType: string;
}

export interface IBindRule {
  associativeEntityId: string;
  ruleId: string;
  entitySubIds: string;
  expr: [string[]];
  bizDomain: string;
}

export interface IGetBindRuleList {
  bizDomain: string;
  sourceEntityId: string;
  entityType: number;
}

export interface IRemoveRule {
  bizDomain: string;
  sourceEntityId: string;
  associativeEntityId: string;
  associativeEntityValue: string;
}
