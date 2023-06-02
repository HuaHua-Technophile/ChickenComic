<script lang="ts">
  import { defineComponent, ref, watchEffect } from "vue";
  import { useGlobalStore } from "../stores/counter";
  export default defineComponent({
    setup() {
      let { theme, changeTheme } = useGlobalStore();
      let checked = ref(false);
      const changebackground = () => {
        changeTheme();
      };

      // watchEffect(() => {
      //   console.log(checked.value);
      // });

      return {
        checked,
        changebackground,
      };
    },
  });
</script>

<template>
  <div class="SettingAbout">
    <div>
      <ul>
        <li>
          <div class="txt">
            <h6>夜间模式</h6>
            <p>开启夜间模式，夜间观看不伤眼</p>
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              @click="changebackground" />
          </div>
        </li>
        <li>
          <h6>版本更新</h6>
          <i class="bi bi-chevron-right"></i>
          <svg class="bi" width="32" height="32" fill="currentColor">
            <use xlink:href="bootstrap-icons.svg#heart-fill" />
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .SettingAbout {
    * {
      margin: 0;
      padding: 0;
    }
    ul {
      margin: 0 auto;
      border-radius: 10px;
      backdrop-filter: blur(30px);
      width: 90%;

      li:first-child {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 10px;
        border-radius: 10px;

        .txt {
          h4 {
            font-size: 14px;
          }
          p {
            font-size: 12px;
            zoom: 0.6;
          }
        }
      }
    }
  }
</style>
