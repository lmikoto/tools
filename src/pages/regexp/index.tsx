import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';

import { Input } from 'antd';

import styles from './index.less';

const { TextArea } = Input;

const textConfig = { minRows: 4, maxRows: 4 };

export default () => {
  const [value, setValue] = useState<string>('');
  const [testText, setTestText] = useState<string>('');
  const [replace, setReplace] = useState<string>('');

  const getReplacedStr = () => {
    if (testText.length > 0 && replace.length > 0) {
      return testText.replace(new RegExp(value), replace);
    }
    return '';
  };

  return (
    <PageHeaderWrapper title={false} className={styles.main}>
      <div className={styles.container}>
        <TextArea
          onChange={e => setValue(e.target.value)}
          value={value}
          placeholder="正则表达式"
          autoSize={{ minRows: 2, maxRows: 2 }}
        />
        <TextArea
          onChange={e => setTestText(e.target.value)}
          value={testText}
          placeholder="测试文本"
          autoSize={textConfig}
        />
        <TextArea placeholder="匹配结果" autoSize={textConfig} />
        <Input
          className={styles.replace}
          placeholder="要替换的文本"
          value={replace}
          onChange={e => setReplace(e.target.value)}
        />
        <TextArea placeholder="替换之后的结果" autoSize={textConfig} value={getReplacedStr()} />
      </div>
    </PageHeaderWrapper>
  );
};
