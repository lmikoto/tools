import React, { PureComponent } from 'react';
import { Radio, InputNumber, message, List, Checkbox, Select } from 'antd';
const { Group } = Radio;
export default class Second extends PureComponent {
  constructor(props) {
    super(props);
    this.formatSecondOptions();
  }

  formatSecondOptions() {
    this.secondOptions = [];
    for (let x = 0; x < 60; x++) {
      this.secondOptions.push({
        label: x < 10 ? `0${x}` : x,
        value: `${x}`,
      });
    }
  }

  changeParams(type, value) {
    const state = { ...this.props.second };
    state[type] = value;
    if (type === 'start') {
      if (state.end - state.start <= 1) {
        state.end = value + 1;
      }
    }
    if (type === 'end') {
      if (state.end - state.start <= 1) {
        state.start = value - 1;
      }
    }
    this.props.onChange(state);
  }

  render() {
    const {
      second: { type, start, end, begin, beginEvery, some },
    } = this.props;
    return (
      <div>
        <Group
          value={type}
          onChange={e => {
            const state = { ...this.props.second };
            state.type = e.target.value;
            this.props.onChange(state);
          }}
          className="full"
        >
          <List size="small" bordered>
            <List.Item>
              <Radio value="*">每秒</Radio>
            </List.Item>
            <List.Item style={{ marginBottom: 5 }}>
              <Radio value="period">周期</Radio>
              从 &nbsp;
              <InputNumber
                min={0}
                max={58}
                defaultValue={0}
                style={{ width: 80 }}
                placeholder="秒"
                size="small"
                value={start}
                onChange={value => {
                  this.changeParams('start', value);
                }}
                disabled={type !== 'period'}
              />
              &nbsp;到&nbsp;
              <InputNumber
                min={1}
                max={59}
                defaultValue={1}
                style={{ width: 80 }}
                placeholder="秒"
                value={end}
                size="small"
                onChange={value => {
                  this.changeParams('end', value);
                }}
                disabled={type !== 'period'}
              />
              &nbsp;秒&nbsp;
            </List.Item>
            <List.Item>
              <Radio value="beginInterval"></Radio>
              从第 &nbsp;
              <InputNumber
                min={0}
                max={59}
                defaultValue={0}
                placeholder="秒"
                size="small"
                value={begin}
                onChange={value => {
                  this.changeParams('begin', value);
                }}
                disabled={type !== 'beginInterval'}
              />{' '}
              &nbsp;秒开始， 每 &nbsp;
              <InputNumber
                min={0}
                max={59}
                defaultValue={0}
                placeholder="秒"
                size="small"
                value={beginEvery}
                onChange={value => {
                  this.changeParams('beginEvery', value);
                }}
                disabled={type !== 'beginInterval'}
              />{' '}
              &nbsp;秒执行一次
            </List.Item>
            <List.Item>
              <Radio value="some">具体秒数（可多选）</Radio>
              <Checkbox.Group
                value={some}
                onChange={value => {
                  if (value.length < 1) {
                    return message.warn('至少选择一项');
                  }
                  this.changeParams('some', value);
                }}
                options={this.secondOptions}
                disabled={type !== 'some'}
              />
            </List.Item>
          </List>
        </Group>
      </div>
    );
  }
}
