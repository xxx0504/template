import http, { ResType } from '@/service/http'
import * as T from './types'

export const goodsApiUrl = {
  queryGoodsList: '/topic/query-goods',
}

export const goodsApi: T.IGoodsApi = {
  queryGoodsList: async function (params: {
    contentCode: '958607551967252482'
    pageMode: 8
    pageNum: 2
    pageSize: 10
    sortType: 'ASSIGN_SORT'
    topicCode: '866209892063059968'
  }): Promise<ResType<T.IListRes<null>>> {
    return await http.post(goodsApiUrl.queryGoodsList, params)
  },
}
