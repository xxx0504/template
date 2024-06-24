import { goodsApi } from '@/service/api/goods/goods'

export default defineComponent({
  name: 'Home-view',
  setup() {
    const getList = async () => {
      try {
        const data = await goodsApi.queryGoodsList({
          contentCode: '958607551967252482',
          pageMode: 8,
          pageNum: 2,
          pageSize: 10,
          sortType: 'ASSIGN_SORT',
          topicCode: '866209892063059968',
        })
        if (data.code === '200') {
          console.log(data.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    onMounted(async () => {
      await getList()
    })
    return () => (
      <>
        <div>123</div>
      </>
    )
  },
})
