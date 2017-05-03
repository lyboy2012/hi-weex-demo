var modal = weex.requireModule('modal')
export default {
    data: {
      logoUrl: 'https://alibaba.github.io/weex/img/weex_logo_blue@3x.png',
      target: 'World'
    },
    methods: {
      update: function (e) {
        this.target = 'Weex~'
        console.log('target:', this.target)
        modal.toast({message: 'hello'})
      }
    }
  }