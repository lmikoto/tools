import copyToClipboard from 'copy-to-clipboard';
import { message } from 'antd';

export function copy(content: string) {
  if (copyToClipboard(content)) {
    message.success('复制成功');
  } else {
    message.error('复制失败');
  }
}
