import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';

import { Input, Row, Col, Icon, Tooltip, message } from 'antd';
import JSONTree from 'react-json-tree';
import copy from 'copy-to-clipboard';
import styles from './index.less';
import theme from './tree-theme';
import convert from 'xml-js';
import { download } from '../utils/download';

const { TextArea } = Input;

export default () => {
  const [value, setValue] = useState('');
  const [isZip, setIsZip] = useState(false);
  const showTree = !isZip;

  const getJson = (str: string) => {
    try {
      if (str.startsWith('<?')) {
        return JSON.parse(convert.xml2json(value, { compact: true, spaces: 2 }));
      }
      return JSON.parse(str);
    } catch (e) {
      return {};
    }
  };

  const getStr = (json: string) => JSON.stringify(getJson(json));

  const getStrFormate = (json: string) => JSON.stringify(getJson(json), null, 2);

  const onCopy = () => {
    let copyObj;
    if (isZip) {
      copyObj = getStr(value);
    } else {
      copyObj = getStrFormate(value);
    }
    if (copy(copyObj)) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
  };

  const down = () => {
    download(getStrFormate(value), 'miko.json');
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
              <div className={styles.tools}>
                <Tooltip title="压缩">
                  <Icon type="file-zip" onClick={() => setIsZip(!isZip)} />
                </Tooltip>
                <Tooltip title="复制">
                  <Icon type="copy" onClick={onCopy} />
                </Tooltip>
                <Tooltip title="下载">
                  <Icon type="download" onClick={down} />
                </Tooltip>
                <Tooltip title="清空">
                  <Icon type="delete" onClick={() => setValue('')} />
                </Tooltip>
              </div>
              {isZip && <textarea className={styles.zip}>{getStr(value)}</textarea>}
              {showTree && (
                <JSONTree
                  data={getJson(value)}
                  shouldExpandNode={() => true}
                  getItemString={() => null}
                  hideRoot
                  theme={theme}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  );
};
