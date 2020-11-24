# SvgMap

rn-svg绘制地图画布，主要绘制形式为涂抹式

## 版本

0.3.10

## 代码演示

### 基本用法

```jsx
{() => {
  const mapData = {
    pointsData: {
      black: [{x: 10, y:10}, {x: 20, y: 20}]
    }
  }
  return (
    <SvgMap height={200} width={200} mapData={mapData} />
  )
}}
  
```
