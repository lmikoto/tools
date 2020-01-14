import React, { PureComponent } from "react";
import { Radio, InputNumber, message, List, Checkbox } from "antd";
const { Group } = Radio;
export default class Minute extends PureComponent {
    constructor(props) {
        super(props);
        this.formatMinuteOptions();
    }

    formatMinuteOptions() {
        this.minuteOptions = [];
        for (let x = 0; x < 60; x++) {
            this.minuteOptions.push({
                label: x < 10 ? `0${x}` : x,
                value: `${x}`
            });
        }
    }

    changeParams(type, value) {
        const state = { ...this.props.minute };
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

    changeType = e => {
        const state = { ...this.props.minute };
        // if (e.target.value === "some") {
        //     state.some = ["1"];
        // }
        state.type = e.target.value;
        this.props.onChange(state);
    };

    render() {
        const {
            minute: { type, start, end, some, begin, beginEvery }
        } = this.props;
        return (
            <div>
                <Group value={type} onChange={this.changeType} className="full" >
                    <List size="small" bordered>
                        <List.Item>
                            <Radio value="*">每分钟</Radio>
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="period">周期</Radio>
                            从&nbsp;
                            <InputNumber
                                min={0}
                                max={58}
                                defaultValue={0}
                                style={{ width: 80 }}
                                placeholder="分"
                                size="small"
                                value={start}
                                onChange={value => {
                                    this.changeParams("start", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp;到&nbsp;
                            <InputNumber
                                min={1}
                                max={59}
                                defaultValue={1}
                                style={{ width: 80 }}
                                placeholder="分"
                                value={end}
                                size="small"
                                onChange={value => {
                                    this.changeParams("end", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp;分钟&nbsp;
                        </List.Item>
                        <List.Item>
                            <Radio value="beginInterval"></Radio>
                            从第&nbsp;
                            <InputNumber
                                min={0}
                                max={59}
                                defaultValue={0}
                                placeholder="分"
                                size="small"
                                value={begin}
                                onChange={value => {
                                    this.changeParams("begin", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />
                            &nbsp;分开始， 每&nbsp;
                            <InputNumber
                                min={1}
                                max={59}
                                defaultValue={1}
                                placeholder="分"
                                size="small"
                                value={beginEvery}
                                onChange={value => {
                                    this.changeParams("beginEvery", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />
                            &nbsp;分执行一次
                        </List.Item>
                        <List.Item>
                            <Radio value="some">具体分钟（可多选）</Radio>
                            <Checkbox.Group
                                value={some}
                                onChange={value => {
                                    if (value.length < 1) {
                                        return message.warn("至少选择一项");
                                    }
                                    this.changeParams("some", value);
                                }}
                                options={this.minuteOptions}
                                disabled={type !== "some"}
                            />
                        </List.Item>
                    </List>
                </Group>
            </div>
        );
    }
}
