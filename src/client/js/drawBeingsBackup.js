    //regardless, we're going to update playerX, and the animation. 
    //difference is, we're going to update the playerX in pass 1
    

    //pass 2: just going to get rid of things in the map that shouldn't be there. 
    /*
    return new Promise(resolve => {loader.load(gltfPath_playerRed, gltf => {
        if (!playerMixer){
            scene.add(gltf.scene);
            playerMixer = new THREE.AnimationMixer(gltf.scene);//should be default = 0, so we don't need to do anything.
            console.log("AYO");
            let clips = gltf.animations;
            //console.log(THREE.AnimationClip.findByName( clips, 'Idle' ));
            mainPlayerIdle = playerMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Idle' ));
            mainPlayerRun = playerMixer.clipAction(THREE.AnimationClip.findByName( clips, 'Run' ));
            console.log(mainPlayerRun);
           // console.log("WHAT THE FUCK OH MY GODDDAFFAEGUIGALEBGUEGAE:OGO:");
            mainPlayerRun.play();

        }
        playerX = _mainPlayerInfo.x;
        playerY = _mainPlayerInfo.y;
         
        if (_mainPlayerInfo.animation != mainPlayerCurrentAnim._clip.name){
            if (_mainPlayerInfo.animation == "Idle"){
                mainPlayerCurrentAnim = mainPlayerIdle;
                mainPlayerCurrentAnim.play();
            }else{
                mainPlayerCurrentAnim = mainPlayerRun;
                mainPlayerCurrentAnim.play();

            }
        }
        if(playerMixer) playerMixer.update(clock.getDelta());

            //playerMixer._root.animation = //in this scenario it already exists
        });
        resolve();
    });*/


    async function updateBeings(){
        for (const being of _beingsInfo) {
            let unique_id = being.unique_id; //first get the unique_id
            let type = type;
            //if the unique_id doesn't exist, we're going to create a map to it, position, and animate!
            if (!beingsMap.has(unique_id)){
                switch(being.type){
                    case 'player':
                        gltfPath = gltfPath_playerRed;
                        break;
                    case 'robot':
                        if (side == 'ally'){
                            return;
                        }else{
                            gltfPath = gltfPath_robo1Blue;
                        }
                        break;
                }
                await new Promise(resolve=> {
                    loader.load(gltfPath, gltf => {
                        scene.add(gltf.scene);
                        mixer = new THREE.AnimationMixer(gltf.scene);
                        beingsMap.set(unique_id, new ThreeObj(being.x, being.y, being.animation, rotation, type, mixer));
                        resolve();
                    });
                });
            }else{
                //first getting the being object that already exists!
                let beingContainer = beingsMap.get(unique_id).getObj();
                //now, just updating the x and y! (using the mixer, of course)
                beingContainer.updateX(being.x, playerX)
                beingContainer.updateY(being.y, playerY)
    
            }
            //now, all POSITIONS have been updated, and all objects exist. NOW, we need to remove all unnecessary objects and do animations.
            //this is also where we would update any given animation! 
            await new Promise(resolve=> {
                beingMap.forEach(being => {
                    //first, we gotta see the checked. if it's checked, we're going to keep going. if not? we'll remove it from the map.
                    if(being.checked){
                        //
                        being.updateAnimation();
                    }else{
                        //remove it from the map.
                    }
                });
                resolve();
            });
        }
    }
    
    function cleanup(){
        renderer.render(scene, perspectiveCamera);
        console.log("we've rendered, dum dum");
    }
    /*
    function getBeings (being, gltfPath, unique_id) {
        return new Promise(resolve=> {
                loader.load(gltfPath, gltf => {
                    //console.log(a + "<- this is a that should be printed after");
                    mixer = new THREE.AnimationMixer(gltf.scene);
                    beingsMap.set(unique_id, new ThreeObj(being.x, being.y, being.rotation, being.type, mixer, unique_id))
                    resolve();
                });
            
        })
    
        
    } */
        //We're using the player's pos as a sort of axis to get pos for camera and to render other players.
    
                 /**/
                  
    
               
                
         //1st pass - purpose is just to insert new + to figure out which ones stay.
        
            
            //render(mainPlayerInfo, beingsInfo);
    
            //then, we pass it off to render.
        
    //2nd pass - purpose is to just delete each element that has checked = false.
    //for the other elements that we have checked (validated, essentially), their positions should already be updated,
    //so we can just render them.
    /*
    function render(){
        let playerObj = playerMixer._root
        playerObj.position.x = 0//mainPlayerInfo.x; always 0.
        playerObj.position.y = 0//mainPlayerInfo.y;
    
        beingsMap.forEach(being => { //note it's NOT Object.values(beingsMap); just regular for_each it like it's an array. this isn't over the keys, it's over the values by default. 
            if (being.checked){
    
                let x = being.getX(); 
                let y = being.getY();
                let rot = being.getRot();
                let obj = being.getObj();
                obj.position.x = x;
                obj.position.y = y;
                obj.rotation.y = rot;
    
                renderer.render(scene, perspectiveCamera);
                being.checked = false;
    
                //now, we update!;
            }
            else{
                beingsMap.delete(being.unique_id);
            };
        });*/
    
      /*  console.log(playerMixer);
        console.log("***");   
    }*/
    
    /*
    loadChar();
    
    let character;
    
    function loadChar(){
                
            loader.load(gltfPath, gltf=>{
                character = gltf;
                scene.add( gltf.scene );
                var light = new THREE.AmbientLight(0xffffff);
                scene.add(light);
                const anims = gltf.animations;
                aniMixer = new THREE.AnimationMixer(gltf.scene);
                let action = aniMixer.clipAction( gltf.animations[0] )//.timeScale(0.4).play();
                action.timeScale = 0.75;
                action.play();
                console.log(aniMixer);
                console.log(gltf);
                console.log(anims);
                //const action1 = aniMixer.clipAction(anims[0]);
                //console.log(action1);
            
                // action1.play();
            }
        )};
    export function animate() {
    
        if(aniMixer) aniMixer.update(clock.getDelta());
        renderer.render( scene, perspectiveCamera );
        controls.update();
        //console.log(scene);
        //console.log("^scene")
        //console.log("scene");
        //character.scene.position.x += 0.01;
       // character.scene.rot
       console.log(character.scene);
       character.scene.rotation.y = Math.PI;
       //character.unique_id = 4;
        //console.log("in animate");
        //controls.update();
        //console.log(perspectiveCamera.zoom);
        //console.log(perspectiveCamera.position);
        //console.log(perspectiveCameraa.rotation);
        //aniMixer.update( 0.001 );
    
        requestAnimationFrame( animate );
    }
    
    
    
    let objs = [];
    */
    /*
    export function draw(){
        let update = getPlayerUpdate();
        //handleUpdate(objs, update);
        console.log(update);
        //requestAnimationFrame(draw);
        animate();
    }
    
    draw();*/
    
    
    /*
    loader.load(gltfPath, gltf=>{
        console.log("GLTF PLS");
        console.log(gltf);
        scene.add( gltf.scene );
    
        const anims = gltf.animations;
        aniMixer = new THREE.AnimationMixer(gltf.scene);
        actionRun = aniMixer.clipAction( gltf.animations[2] )//.timeScale(0.4).play();
        actionAttack = aniMixer.clipAction(gltf.animations[0]);
        actionRun.timeScale = 0.75;
    
        actionAttack.timeScale = 0.75;
        actionRun.play();
        console.log(aniMixer);
        console.log(gltf);
        console.log(anims);
        //const action1 = aniM
    
    })*/
    /*
    export function test(){
    
    
        if(aniMixer) aniMixer.update(clock.getDelta());
        window.addEventListener('keydown', attackAnimation);
        controls.update();
    
    
    
        renderer.render( scene, perspectiveCamera );
        console.log("should be rendered..");
        
    }
    let attackTime = true;
    function attackAnimation(e){
    
        if (e.key == 'w'){
            aniMixer.stopAllAction();
            if (attackTime){
                actionAttack.fadeIn(0.5);
                actionAttack.play();
                attackTime = false;
            }else{
                actionRun.fadeIn(0.5);
                actionRun.play();
                attackTime = true;
            }
    
            console.log("WENIS");
        }
    }
    */
    
    /*
    F8F0E3
    const scene = new THREE.Scene();
    
    //const renderer = new THREE.WebGLRenderer();
    const renderer = new THREE.WebGLRenderer({ antialias: true  });
    //renderer.outputencoding = 
    renderer.setClearColor( 0xF8F0E3    );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    let h = document.createElement("h1");
    document.body.appendChild(h);
    //const clock = new THREE.Clock();
    renderer.setPixelRatio(window.devicePixelRatio);
    
    let fov = 60;
    let aspect= 1920/1000;
    const near = 1.0;
    const far = 1000.0;
    const perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    perspectiveCamera.position.z = 5;
    perspectiveCamera.position.set(-0.6730816062547518, 2.7839519001909183, -9.628924499495124);    
    perspectiveCamera.rotation.set(-2.8769615661258237, 0.04191538794279975, 3.1302379625007744);
    //perspectiveCamera.fov = 60.00; 
    //const controls = new OrbitControls( perspectiveCamera, renderer.domElement );
    //controls.update();
    
    
    //const loader = new GLTFLoader();
    
    let aniMixer;
    
    //const hemLight = new THREE.HemisphereLight(0xFFFFFF, 0xDA70D6, 0.5);
    //const ambLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    //scene.add(ambLight);
    //scene.add(hemLight);
    directionalLight.position.set(10, 10, 10);
    scene.add( directionalLight );
    */