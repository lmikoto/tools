import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import classNames from 'classnames';

import { copy } from '../utils/copy';

import { Input, Button, Table } from 'antd';

import styles from './index.less';

const { TextArea } = Input;

const textConfig = { minRows: 4, maxRows: 4 };

const regExpList = [
  {
    name: 'url',
    regExp: '^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+',
  },
  {
    name: '中文字符',
    regExp: '[\\u4e00-\\u9fa5]',
  },
  {
    name: '手机',
    regExp: '1[3-9]\\d{9}',
  },
];

const notice = [
  {
    title: '元字符',
    dataSource: [
      {
        grammar: '.',
        desc: '除换行符以外的任意字符',
      },
      {
        grammar: '\\w',
        desc: '字母数字或下划线',
      },
      {
        grammar: '\\s',
        desc: '任意长度的空白符',
      },
      {
        grammar: '\\d',
        desc: '数字',
      },
      {
        grammar: '\\b',
        desc: '单词开始或结束',
      },
      {
        grammar: '^',
        desc: '字符串的开始',
      },
      {
        grammar: '$',
        desc: '字符串结束',
      },
    ],
    columns: [
      {
        title: '语法',
        dataIndex: 'grammar',
        key: 'grammar',
      },
      {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
      },
    ],
  },
  {
    title: '限定字符',
    dataSource: [
      {
        grammar: '*',
        desc: '重复零次或多次',
      },
      {
        grammar: '+',
        desc: '重复一次或多次',
      },
      {
        grammar: '?',
        desc: '重复零次或一次',
      },
      {
        grammar: '{n}',
        desc: '重复n次',
      },
      {
        grammar: '{n,}',
        desc: '重复n次或更多次',
      },
      {
        grammar: '{n,m}',
        desc: '重复n到m次',
      },
    ],
    columns: [
      {
        title: '语法',
        dataIndex: 'grammar',
        key: 'grammar',
      },
      {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
      },
    ],
  },
  {
    title: '反义字符',
    dataSource: [
      {
        grammar: '\\W',
        desc: '任意不是字母，数字，下划线，汉字的字符',
      },
      {
        grammar: '\\S',
        desc: '任意不是空白符的字符',
      },
      {
        grammar: '\\D',
        desc: '任意非数字的字符',
      },
      {
        grammar: '\\B',
        desc: '不是单词开头或结束的位置',
      },
      {
        grammar: '[^x]',
        desc: '除了x以外的任意字符',
      },
    ],
    columns: [
      {
        title: '语法',
        dataIndex: 'grammar',
        key: 'grammar',
      },
      {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
      },
    ],
  },
];

export default () => {
  const [value, setValue] = useState<string>('');
  const [testText, setTestText] = useState<string>('');
  const [replace, setReplace] = useState<string>('');

  const isMatch = testText.length > 0 && value.length > 0;
  const isReplace = testText.length > 0 && value.length > 0 && replace.length > 0;

  const getReplacedStr = () => {
    if (isReplace) {
      return testText.replace(new RegExp(value, 'g'), replace);
    }
    return '替换后的文本';
  };

  const replacedStyle = isReplace
    ? classNames(styles.match, styles.input)
    : classNames(styles.match, styles.placeholder);
  const macthStyle = isMatch
    ? classNames(styles.match, styles.input)
    : classNames(styles.match, styles.placeholder);

  const getMatchResult = () => {
    if (isMatch) {
      return testText.replace(new RegExp(value, 'g'), '<span style="color: red">$&</span>');
    }
    return '匹配结果';
  };

  return (
    <PageHeaderWrapper title={false} className={styles.main}>
      <div className={styles.container}>
        <div className={styles.regTitle}>常用正则表达式</div>
        <div className={styles.buttonContainer}>
          {regExpList.map((item, index) => (
            <Button
              onClick={() => setValue(item.regExp)}
              className={styles.regButton}
              key={index.toString()}
            >
              {item.name}
            </Button>
          ))}
        </div>
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
        <div className={macthStyle} dangerouslySetInnerHTML={{ __html: getMatchResult() }} />
        <Input
          className={styles.replace}
          placeholder="要替换的文本"
          value={replace}
          onChange={e => setReplace(e.target.value)}
        />
        <div className={replacedStyle} placeholder="匹配结果">
          {getReplacedStr()}
        </div>
        <Button onClick={() => copy(getReplacedStr())}>复制替换结果</Button>
        <div className={styles.tableContainer}>
          {notice.map((item, index) => (
            <div key={index.toString()} className={styles.table}>
              <div>{item.title}</div>
              <Table dataSource={item.dataSource} columns={item.columns} pagination={false} />
            </div>
          ))}
        </div>
      </div>
    </PageHeaderWrapper>
  );
};
