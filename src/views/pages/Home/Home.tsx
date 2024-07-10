import { goodsApi } from '@/service/api/goods/goods'
import './index.less'
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
        <div class="home-body">
          <div class="text-1">文本001</div>
          <div class="text-2">文本002</div>
          <div class="text-3">文本003</div>
        </div>
      </>
    )
  },
})
