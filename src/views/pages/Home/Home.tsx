import { goodsApi } from '@/service/api/goods/goods'

export default defineComponent({
  name: 'Home-view',
  setup() {
    const getList = async () => {
      try {
        const data = await goodsApi.queryGoodsList({})
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
