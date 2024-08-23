<template>
    <div id="my-three" style="width: 100%;height: 80vh;"></div>
  </template>
  
  <script setup>
  import {ref, onMounted} from 'vue'
  import * as THREE from 'three'
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
  import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'; //gltf
  
  
  onMounted(() => {
  document.getElementById('my-three')?.appendChild(renderer.domElement)
  init()
  renderModel()
  gltfModel1()
  initEvent()
  render()
 
  resize()
  })
  
  // 基本配置 
  // 创建场景，相机，光源
  const width = window.innerWidth, height = window.innerHeight;
  const scene = new THREE.Scene(); // 透视相机
  const renderer = new THREE.WebGLRenderer() //渲染器
  const loader = new GLTFLoader(); //加载器
  const camera = new THREE.PerspectiveCamera(1, width / height, 20, 2000); //透视相机
  const controls = new OrbitControls(camera, renderer.domElement) //控制器
  
  
  function init() {
  //光源
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);//光源，color:灯光颜色，intensity:光照强度
  directionalLight.position.set(300, 200, 400); //设置光源位置
  scene.add(directionalLight);//添加平行光
  
  //设置相机位置
  camera.position.set(100, 100, 150);
  //设置相机方向
  camera.lookAt(10, 50, 10);
  
  //辅助坐标轴
//   const axesHelper = new THREE.AxesHelper(200);//参数200标示坐标系大小，可以根据场景大小去设置
//   scene.add(axesHelper);
  scene.background = new THREE.Color(0xeaeaea);//设置背景颜色
  
  renderer.setPixelRatio(window.devicePixelRatio);//设置渲染器分辨率
  renderer.antialias = true;//设置渲染器抗锯齿
  }
  const gridHelper = new THREE.GridHelper(50, 50); // 网格大小和分割数  
scene.add(gridHelper)
  let vehicle ;
// 在你的gltfModel1函数中，保存车辆引用  
function gltfModel1() {  
  loader.load("/su7.glb", function (gltf) { 
    console.log('gltf',gltf) 
    scene.add(gltf.scene);  
    scene.add( gltf.scenes[0].rotation.y = 100)
        // 假设车辆模型已加载并添加到场景中  
        vehicle = gltf.scene;  
       
   animate()
  }, undefined, function (error) {  
    console.error('An error happened', error);  
  });  
}
// 车辆运动
// let speed = 0.01; // 控制速度  
let offset = 0; // 用于滚动背景的偏移量  
  
function animate() {  
    requestAnimationFrame(animate);  
  
    // 更新背景偏移量，创建滚动效果  
    offset += 0.1; // 根据需要调整这个值来控制滚动速度  
    gridHelper.position.x = -offset % 20; // 假设网格线宽度为10，这里让网格线在-10到10之间循环  
  
    // 更新车辆位置（这里假设车辆是向前移动的）  
    // vehicle.position.x += speed;  
  
    // 如果需要，可以在这里添加代码来“重置”车辆位置，使其看起来像是在无限循环的轨道上行驶  
    // 例如，当vehicle.position.x超过某个值时，将其重置为起点  

    renderer.render(scene, camera);  
}
  
  function renderModel() {
  //渲染
  renderer.setSize(width, height)//设置渲染区尺寸
  renderer.render(scene, camera)//执行渲染操作、指定场景、相机作为参数
  // renderer.setClearColor(0x00ff00); // 设置背景颜色为绿色
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // 设置曝光度
  renderer.toneMappingExposure = 1.5; // 适当调整曝光度
  
  controls.minPolarAngle = Math.PI / 6; // 最小极角为 45 度
  controls.maxPolarAngle = Math.PI / 1.5; // 最大极角为 90 度
  }
  
  function render() {
  renderer.render(scene, camera);
  controls.update()
  requestAnimationFrame(render);
  }
  

  
  function initEvent() {
  // 监听窗口大小变化
  window.addEventListener('resize', resize, false);
  }
  function resize(){
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  }
  
  
  // 交互事件
  addEventListener('dblclick', onMouseDblclick, false)
  function onMouseDblclick(event) {
  let intersects = getIntersects(event);
  
  if (intersects.length !== 0 && intersects[0].object instanceof THREE.Mesh) {
  
    const selectedObject = intersects[0].object;
    let selectedObjects = [];
    selectedObjects.push(selectedObject);
    console.log(selectedObjects)
    // outlinePass.selectedObjects = selectedObjects;
  
  }
  }

//  

  //获取与射线相交的对象数组
  function getIntersects(event) {
  let rayCaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  
  //通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; //这里为什么是-号，没有就无法点中
  
  //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
  rayCaster.setFromCamera(mouse, camera);
  return rayCaster.intersectObjects(scene.children);
  }
  
  </script>
  
  <style scoped lang="scss">
  
  </style>
  