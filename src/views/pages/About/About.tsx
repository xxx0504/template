import data from '.';
import './index.less';
import NProgress from 'nprogress';
export default defineComponent({
  name: 'AboutView',
  setup() {
    const { lists, getRandomColor } = data();
    onMounted(() => {
      NProgress.start(); // 开始显示进度条
    });
    return () => (
      <>
        <div class="menus">
          <div>
            <button class="hamburger">
              <div class="hamburger__line"></div>
              <div class="hamburger__line"></div>
              <div class="hamburger__line"></div>
            </button>
          </div>
          {lists.map(msg => {
            return (
              <p>
                <a href={`#${msg}`}>{msg}</a>
              </p>
            );
          })}
        </div>
        <div class="aboutBody">
          {lists.map(msg => {
            return (
              <div id={msg} style={{ background: getRandomColor() }}>
                msg
              </div>
            );
          })}
        </div>
      </>
    );
  },
});
