<template>
    <div>
        <iframe id='iframePage' src="https://www.baidu.com/" frameborder="0" scrolling="auto" style="width:100%;height:800px;"></iframe>
    </div>
</template>

<script>
    export default {
      methods: {
        iframeLoad() {
          console.log('cccc')
          var idEle = document.getElementById('iframePage')
          console.log(idEle)
          // document.getElementById('iframePage').height = 0
          // document.getElementById('iframePage').height = document.getElementById('iframe').contentWindow.document.body.scrollHeight
        }
      },
      created() {
        // this.iframeLoad()
      }
    }
</script>
