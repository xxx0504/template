import data from '.'
import './index.less'
export default defineComponent({
  name: 'About-view',
  setup() {
    const {lists,getRandomColor}=data()
    return () => (
      <>
        <div class="menus">
          {
            lists.map((msg)=>{
              return <p><a href={`#${msg}`}>{msg}</a></p>
            })
          }
        </div>
        <div class="aboutBody">
        {
            lists.map((msg)=>{
              return <div id={msg} style={{'background':getRandomColor()}}>msg</div>
            })
          }
        </div>
      </>
    )
  },
})
