import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';

import { Input, Row, Col } from 'antd';
import JSONTree from 'react-json-tree';
import styles from './index.less';
import theme from './tree-theme';

const { TextArea } = Input;

export default () => {
  const [value, setValue] = useState('');

  const getJson = (str: string) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return {};
    }
  };

  return (
    <PageHeaderWrapper title={false} className={styles.main}>
      <div className={styles.container}>
        <Row>
          <Col span={10}>
            <TextArea
              value={value}
              onChange={e => setValue(e.target.value)}
              className={styles.textarea}
            />
          </Col>
          <Col span={14}>
            <div className={styles.treeContainer}>
              <JSONTree
                data={getJson(value)}
                shouldExpandNode={() => true}
                getItemString={() => null}
                hideRoot
                theme={theme}
              />
            </div>
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  );
};
