//vue工厂，动态加载vue组件
function vueFactory (component, parent) {  
  const constructor = Vue.extend(component)  
  let ins = new constructor({  
    el: window.document.createElement('div'),  
    parent: parent  
  })  
  window.document.body.appendChild(ins.$el)  
} 