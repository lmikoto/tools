import request from '@/utils/request';

export async function queryNext(cron: string, num: number): Promise<any> {
  return request('/api/cron/next', { params: { cron, num } });
}
