Page({
  data: {
    markers: [{
      iconPath: "/utils/image/icon_location_selected@2x.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 28,
      height: 39
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/icon_location_normal@2x.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})