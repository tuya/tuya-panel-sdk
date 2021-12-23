import { SimpleVerticalSlider } from '@tuya/tuya-panel-szos-sdk';
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { TYText } from 'tuya-panel-kit'

export default class SimpleVerticalSliderScene extends PureComponent {
  constructor (props: any) {
    super(props)
    this.state = {
      value: 30,
      min: 0,
      max: 200,
    }
  }

  changeVol (val: number) {
    this.setState({ value: val })
  }

  render () {
    const { value, min, max } = this.state
    return (
      <View
        style={{
          justifyContent: 'center',

          alignItems: 'center',
          marginTop: 75,
          marginBottom: 94,
          flex: 1,
          padding: 20,
        }}
      >
        <TYText text={`当前value:${value}`}/>
        <View style={{ width:200, justifyContent: 'space-between', flexDirection: 'row' }}>
          <SimpleVerticalSlider
            style={{ width: 80, height: 274, borderRadius: 16, marginTop: 20 }}
            value={value}
            min={min}
            max={max}
            onMove={(v: number) => this.changeVol(v)}
            onRelease={(v: number) => this.changeVol(v)}
            onPress={(v: number) => this.changeVol(v)}
          />
          <SimpleVerticalSlider
            type="linearGradient"
            style={{ width: 80, height: 274, borderRadius: 16, marginTop: 20 }}
            value={value}
            min={min}
            max={max}
            onMove={(v: number) => this.changeVol(v)}
            onRelease={(v: number) => this.changeVol(v)}
            onPress={(v: number) => this.changeVol(v)}
          />
        </View>

      </View>
    )
  }
}
