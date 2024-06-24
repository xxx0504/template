import { ResType } from '@/service/http'

export interface ILoginParams {
  userName: string
  passWord: string | number
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<ResType<ILoginRes>>
}
export interface ILoginRes {
  token: string
}

export interface IPageParams {
  pageNum?: number
  pageSize?: number
}

// export interface IPageRes {

// }

export interface IListRes<T> {
  firstPage: boolean
  hasNextPage: boolean
  hasPreviousPage: boolean
  lastPage: boolean
  navigateFirstPage: number
  navigateLastPage: number
  navigatePages: number
  navigatepageNums: number[]
  nextPage: number
  pageNum: number
  pageSize: number
  pages: number
  prePage: number
  total: number
  list: Array<T>
}

export interface IGoodsApi {
  queryGoodsList: (params: {
    contentCode: '958607551967252482'
    pageMode: 8
    pageNum: 2
    pageSize: 10
    sortType: 'ASSIGN_SORT'
    topicCode: '866209892063059968'
  }) => Promise<ResType<IListRes<null>>>
}
