var gs='home',mode='normal'
var cd=0,pcd=0,score=0,carSpeed=2
var carGroup,car,w2


function preload(){
    bg=loadImage('assets/home.png')
    pb=loadImage('assets/play.png')
    cr=loadImage('assets/credits.png')
    qm=loadImage('assets/qm.png')
    crwi=loadImage('assets/cr.png')
    ari=loadImage('assets/arrow.png')
    about=loadImage('assets/about.png')
    pc=loadImage('assets/playscreen.png')
    ri=loadImage('assets/reset.png')
    red=loadImage('assets/carr.png')
    blue=loadImage('assets/carb.png')
    green=loadImage('assets/cargr.png')
    gray=loadImage('assets/carg.png')
    yellow=loadImage('assets/cary.png')
    pause=loadImage('assets/puase.png')

}

function setup(){
    createCanvas(270,480)
    carGroup=createGroup()
    pbs=createSprite(width/2,height/2,20,20)
    pbs.addImage(pb)
    crs=createSprite(width/2,height/2+150)
    crs.addImage(cr)
    crs.scale=0.8
    qs=createSprite(width/2,height/2+200)
    qs.addImage(qm)
    qs.scale=0.8
    awb=createSprite(width/2-70,height/2+210)
    awb.addImage(ari)
    awb.rotation=-90
    awb.scale=0.4
    awb.visible=false
  
    
    crb=createSprite(width/2-70,height/2-120)
    crb.addImage(ari)
    crb.rotation=-90
    crb.scale=0.5
    crb.visible=false

   
    la=createSprite(width/2-80,height/2+190)
    la.addImage(ari)
    la.rotation=-90
    la.scale=0.7
    la.visible=false
    ra=createSprite(width/2+80,height/2+190)
    ra.addImage(ari)
    ra.rotation=90
    ra.scale=0.7
    ra.visible=false
    rb=createSprite(width/2,height/2+190)
    rb.addImage(ri)
    rb.scale=0.6
    rb.visible=false
    pbb=createSprite(width/2-80,height/2+130)
    pbb.addImage(ari)
    pbb.rotation=-90
    pbb.scale=0.4
    pbb.visible=false


    w1=createSprite(width/2,height/2-220,350,20)
    w1.visible=false
    w2=createSprite(width/2,height/2+115,350,10)
    w2.visible=false

    p=createSprite(width/2,height/2+50,10,10)
    p.addImage(red)
    p.scale=0.8
    p.setCollider('rectangle',0,0,40,80)
    p.visible=false

}

function draw(){
    background(bg)
    
    if(gs==='home'){
        background(bg)
        pbs.visible=true
        qs.visible=true
        crs.visible=true
        crb.visible=false
        awb.visible=false
        la.visible=false
        ra.visible=false
        rb.visible=false
        pbb.visible=false
        p.visible=false

        
        if(mousePressedOver(crs)){
            gs='credits'
        }
        if(mousePressedOver(qs)){
            gs='about'
        }
        if(mousePressedOver(pbs)){
            gs='play'
        }

        reset()
        }
    if(gs==='credits'){
        background(crwi)
        crb.visible=true
        pbs.visible=false
        crs.visible=false
        qs.visible=false
        if(mousePressedOver(crb)){
            gs='home'
        }
    }
    if(gs==='about'){
        background(about)
        awb.visible=true
        pbs.visible=false
        crs.visible=false
        qs.visible=false
        if(mousePressedOver(awb)){
            gs='home'
        }
    }
    if(gs==='play'){
        pbs.visible=false
        qs.visible=false
        crs.visible=false
        background(pc)
        la.visible=true
        ra.visible=true
        rb.visible=true
        pbb.visible=true
        p.visible=true
        controls()
        spawnCars()
        for(var i=0;i<carGroup.length;i++){
           if(carGroup.get(i).y>height/2+50){
                carGroup.get(i).destroy()
           }
        }
    }
    if(gs==='end'){
        background(pc)
        car.velocityY=0
        car.lifetime=-1
        p.visible=false
        textSize(20)
        textFont('Courier')
        fill(0)
    text('Game Over!',width/2-20,height/2+130)
    if(mousePressedOver(rb)){
        gs='play'
    }
    if(mousePressedOver(pbb)){
        gs='home'
    }
    }

    drawSprites()
}

function controls(){
    score+=1
    cd-=1
    pcd-=1
    p.bounceOff(w1)
    p.bounceOff(w2)

    textSize(20)
    textFont('Courier')
    fill(0)
    text('score:'+Math.round(score/60),width/2-20,height/2+130)

    if(mousePressedOver(la)&&cd<0&&p.x!=75){
        p.x-=60
        cd=5
    }
    if(mousePressedOver(ra)&&cd<0&&p.x!=195){
       p.x+=60
       cd=5
    }
    if(mousePressedOver(pbb)){
        gs='home'
    }
    if(mousePressedOver(rb)){
        reset()
    }

    if(score%3===0){
        carSpeed+=0.01
    }

    if(p.isTouching(carGroup)){
        gs='end'
    }
}

function reset(){
    p.x=width/2
    score=0
    carGroup.destroyEach()
    carSpeed=2
}

function spawnCars(){
    if(frameCount%100===0){
        r1=Math.round(random(1,3))
        r2=Math.round(random(1,4))
        console.log(p.x)
        car=createSprite(0,height/2-160,10,10)
        car.velocityY=carSpeed
        carGroup.add(car)
        car.scale=0.8
        car.setCollider('rectangle',0,0,40,80)

        switch(r1){
            case 1:car.x=75
            break
            case 2:car.x=135
            break
            case 3:car.x=195
            default:break
        }
        
        switch(r2){
            case 1:car.addImage(blue)
            break
            case 2:car.addImage(green)
            break
            case 3:car.addImage(gray)
            break
            case 4:car.addImage(yellow)
            default:break
            
        }
       
    }
}
