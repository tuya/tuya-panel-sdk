# SettingsSectionList

基于TYSectionList 的简单封装，支持通过传递dp来显示隐藏该项，不传递onPress可根据dp类型展示默认弹层

## 版本

0.3.10

## 代码演示

### 基本用法

```tsx
  {
    const data = [
      {
        title: Strings.getLang('functionSetting'),
        data: [
          {
            key: 'Location',
            dpCode: DPCodes.location,
            title: Strings.getDpLang(DPCodes.location),
            onPress: () => {
            },
          },
          {
            key: 'ResetMap',
            dpCode: DPCodes.ResetMap,
            title: Strings.getDpLang(DPCodes.ResetMap),
          },
          {
            key: 'water',
            dpCode: DPCodes.water,
            title: Strings.getDpLang(DPCodes.water),
            value: dpState[DPCodes.water],
          },
        ],
      },
    ]
    () => {
      return (<SettingsSectionList sections={data}  />)
    }
  }
  
```
