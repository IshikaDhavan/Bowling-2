AFRAME.registerComponent("bowling-ball",{
    init:function(){
        this.throwBall()
    },
    throwBall:function(){
        window.addEventListener("keydown",(e) => {
            if(e.key == "z"){
                var ball = document.createElement("a-entity")

                ball.setAttribute("gltf-model","./assets/ball/scene.gltf")
                ball.setAttribute("scale",{x: 3,y: 3,z: 3})

                
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")

                ball.setAttribute("position",{x: pos.x, y: pos.y-1.2, z: pos.z-2})

                var camera = document.querySelector("#camera").object3D;

                var direction =  new THREE.Vector3();
                camera.getWorldDirection(direction);

                ball.setAttribute("velocity",direction.multiplyScalar(-10))

                var scene = document.querySelector("#scene")

                ball.setAttribute("dynamic-body",{
                    mass: "0",
                    shape: "sphere"
                })


                ball.addEventListener("collide", this.removeBall);

                scene.appendChild(ball)

            }
        })
    },
    removeBall:function(e){
        
    var element = e.detail.target.el;
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("pin")) {
      
      var impulse = new CANNON.Vec3(-2,-2,1);
      var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"));

      elementHit.body.applyForce(impulse, worldPoint);

      element.removeEventListener("collide", this.throwBall);

      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
    }
})