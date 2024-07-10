import http from '@/service/http';
export const goodsApiUrl = {
    queryGoodsList: '/activity-invite/queryActivityInviteRule',
};
export const goodsApi = {
    queryGoodsList: async function (params) {
        return await http.get(goodsApiUrl.queryGoodsList, params);
    },
};
