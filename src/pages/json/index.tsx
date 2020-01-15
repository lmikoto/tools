import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import styles from './index.less';

export default () => {
  return (
    <PageHeaderWrapper title={false} className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}></div>
    </PageHeaderWrapper>
  );
};
