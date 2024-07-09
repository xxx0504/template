import http, { ResType } from '@/service/http'
import * as T from './types'

export const goodsApiUrl = {
  queryGoodsList: '/activity-invite/queryActivityInviteRule',
}

export const goodsApi: T.IGoodsApi = {
  queryGoodsList: async function (params): Promise<ResType<T.IListRes<null>>> {
    return await http.get(goodsApiUrl.queryGoodsList, params)
  },
}
