import Cron from '@/pages/cron/components/index';
import React, { useState, useEffect } from 'react';
import { Button, Input, List, message } from 'antd';

import { queryNext } from '@/services/cron';

import copy from 'copy-to-clipboard';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from '@/pages/json/index.less';

export default () => {
  const [value, setValue] = useState<string>('0 0 0 * * ?');
  const [next, setNext] = useState<string[]>([]);
  const onCopy = () => {
    if (copy(value)) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
  };
  useEffect(() => {
    queryNext(value, 10).then(res => {
      setNext(res);
    });
  }, [value]);

  return (
    <PageHeaderWrapper className={styles.main} title={false}>
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
      <List>
        <List.Item>下次执行时间</List.Item>
        {next.map((i, k) => (
          <List.Item key={k.toString()}>{i}</List.Item>
        ))}
      </List>
    </PageHeaderWrapper>
  );
};
