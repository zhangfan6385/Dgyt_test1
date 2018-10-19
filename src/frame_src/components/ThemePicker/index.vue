<template>
  <!-- <el-color-picker
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    v-model="theme"></el-color-picker> -->

    <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
      <div>
        <svg-icon icon-class="theme" style="color:white;width:22px;height:22px;vertical-align: middle;cursor: pointer;"/>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="#3A8EE6"><div class="dropItem"><div class="rect blue"></div><div class="span">蓝</div></div></el-dropdown-item>
        <el-dropdown-item command="#C03639"><div class="dropItem"><div class="rect red"></div><div class="span">红</div></div></el-dropdown-item>
        <el-dropdown-item command="#30B08F"><div class="dropItem"><div class="rect green"></div><div class="span">绿</div></div></el-dropdown-item>
        <el-dropdown-item command="#909399"><div class="dropItem"><div class="rect gray"></div><div class="span">灰</div></div></el-dropdown-item>
        <!--<el-dropdown-item command="#909399"><div class="dropItem"><img src="../../../frame_src/imgs/graySmall.png"><div class="span">灰</div></div></el-dropdown-item>-->
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>

const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
// const ORIGINAL_THEME = '#3A8EE6' // default color
var lastTheme = '#3A8EE6'

export default {
  data() {
    return {
      chalk: '', // content of theme-chalk css
      theme: ORIGINAL_THEME
    }
  },

  methods: {
    handleSetLanguage(style) {
      this.$store.state.user.themClass=style
      const themeCluster = this.getThemeCluster(style.replace('#', ''))
      
      const originalCluster = this.getThemeCluster(lastTheme.replace('#', ''))
      var tagsColor = document.querySelector('.tags-view-container .tags-view-wrapper .tags-view-item.active')
      tagsColor.style.cssText = 'background-color:' + style + ';border-color:' + style// 替换颜色
      var subMenu = document.querySelector('.sidebar-container .theme')
      if (style === '#3A8EE6') { // 蓝
        subMenu.classList.remove('themeGreen', 'themeRed', 'themeGray')
        subMenu.classList.add('themeBlue')
      } else if (style === '#C03639') { // 红
        subMenu.classList.remove('themeBlue', 'themeGreen', 'themeGray')
        subMenu.classList.add('themeRed')
      } else if (style === '#30B08F') { // 绿
        subMenu.classList.remove('themeBlue', 'themeRed', 'themeGray')
        subMenu.classList.add('themeGreen')
      } else if (style === '#909399') { // 灰
        subMenu.classList.remove('themeGreen', 'themeRed', 'themeBlue')
        subMenu.classList.add('themeGray')
      } else { // 蓝
        subMenu.classList.remove('themeGreen', 'themeRed', 'themeGray')
        subMenu.classList.add('themeBlue')
      }
      //console.log(themeCluster, originalCluster)
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(lastTheme, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })
      lastTheme = style
      this.$message({
        message: '换肤成功',
        type: 'success'
      })
    },

    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  },
  beforeUpdate() {
    var st=this.$store.state.user.themClass
    //  this.handleSetLanguage(st)
  },
  created() {
    //console.log(this.$store.state.user.themClass+'sdfd');
    //this.handleSetLanguage(this.$store.state.user.themClass)
  //   const style = '#3A8EE6'//409EFF
  //   //const style=this.$store.state.user.themClass
  //   const themeCluster = this.getThemeCluster(style.replace('#', ''))
  //   const originalCluster = this.getThemeCluster(lastTheme.replace('#', ''))
  //   const getHandler = (variable, id) => {
  //     return () => {
  //       const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
  //       const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
  //       let styleTag = document.getElementById(id)
  //       if (!styleTag) {
  //         styleTag = document.createElement('style')
  //         styleTag.setAttribute('id', id)
  //         document.head.appendChild(styleTag)
  //       }
  //       styleTag.innerText = newStyle
  //     }
  //   }

  //   const chalkHandler = getHandler('chalk', 'chalk-style')

  //   if (!this.chalk) {
  //     const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
  //     this.getCSSString(url, chalkHandler, 'chalk')
  //   } else {
  //     chalkHandler()
  //   }

  //   const styles = [].slice.call(document.querySelectorAll('style'))
  //     .filter(style => {
  //       const text = style.innerText
  //       return new RegExp(lastTheme, 'i').test(text) && !/Chalk Variables/.test(text)
  //     })
  //   styles.forEach(style => {
  //     const { innerText } = style
  //     if (typeof innerText !== 'string') return
  //     style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
  //   })
  //   lastTheme = style
   }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/variables.scss';

.dropItem{
  margin-bottom: 2px;
  display: flex;
}

.rect {
  width:20px; 
  height:20px;
}

.span{
  padding-left: 5px;
  line-height: 20px;
}

.green{
  background: green
}

.red{
  background: red
}

.blue{
  background: blue
}

.gray{
  background: gray
}

.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
