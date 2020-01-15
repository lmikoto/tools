import Cron from '@/pages/cron/components/index';
import React, { useState, Fragment } from 'react';
import { Button, Input, List, message } from 'antd';
import CronConvert from 'cron-converter';

import copy from 'copy-to-clipboard';

export default () => {
  const [value, setValue] = useState<string>('0 0 0 * * ?');
  const onCopy = () => {
    const cron: any = new CronConvert();
    cron.fromString(value);
    console.log(
      cron
        .schedule()
        .next()
        .format(),
    );
    if (copy(value)) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
  };
  return (
    <Fragment>
      <Cron onChange={setValue} tabType="card" showCrontab={false} value={value} />
      <List>
        <List.Item>Cron表达式</List.Item>
        <List.Item>
          <Input value={value} onChange={e => setValue(e.target.value)} />
        </List.Item>
        <List.Item>
          <Button type="primary" onClick={onCopy}>
            复制
          </Button>
        </List.Item>
      </List>
    </Fragment>
  );
};
