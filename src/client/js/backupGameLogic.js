function getDiv2(){

    function getDiv1(){

        console.log("AYOOO???");
        let roboUnit1 = $("<div></div>").addClass("roboUnit");
        roboUnit1.append($("<div></div>").addClass("unitImgHolder").append($(`<img src=${robo1Mug} id="roboImage1" width=50 height=50 ></img>`).addClass("unitImg")));//.css('object-fit','fill'));
        //let infoHolder1 = $("<div></div>").addClass("roboI");
        let roboInfoDiv = $("<div></div>").addClass("unitInfo");
        roboInfoDiv.append($(`<img src=${dmg} width=20 height=20></img>`).addClass("img1"))
        roboInfoDiv.append($('<div>5</div>').addClass("text text1"))
        roboInfoDiv.append($(`<img src=${hp} width=20 height=20></img>`).addClass("img2"));
        roboInfoDiv.append($('<div>25</div>').addClass("text text2"))
        roboInfoDiv.append($(`<img src=${speed} width=20 height=20></img>`).addClass("img3"));
        roboInfoDiv.append($('<div>3</div>').addClass("text text3"))
        roboInfoDiv.append($(`<img src=${atkSpeed} width=20 height=20></img>`).addClass("img4"));
        roboInfoDiv.append($('<div>2</div>').addClass("text text4"))
        roboInfoDiv.append($(`<img src=${range} width=20 height=20></img>`).addClass("img5"));
        roboInfoDiv.append($('<div>1</div>').addClass("text text5"))
        roboInfoDiv.append($(`<img src=${aoe} width=20 height=20></img>`).addClass("img6"));
        roboInfoDiv.append($('<div>1</div>').addClass("text text6"))
    
    
        //infoHolder1.append(roboInfoDiv1_1);
        //infoHolder1.append(roboInfoDiv1_2);
        //
        //let roboImgDiv = $()
      //  roboUnit1.append(roboImg1Div);
        roboUnit1.append(roboInfoDiv);
        let title = $("<div>Fighter Bot</div>").addClass("title");
        roboUnit1.append(title);
    
        store.append(roboUnit1);//robo1Mug
    
        return roboUnit1;
    
    
       // let orbs = $("#orbsInv").append($("<div>Hey</div>").addClass("orbsDiv"));
        //.addClass("orbs")
    
        //roboUnit1.css('border', '1px dotted black');
    }

    
    let roboUnit1 = $("<div></div>").addClass("roboUnit");
    roboUnit1.append($("<div></div>").addClass("unitImgHolder").append($(`<img src=${robo2Mug} id="roboImage2" width=50 height=50 ></img>`).addClass("unitImg")));//.css('object-fit','fill'));
    //let infoHolder1 = $("<div></div>").addClass("roboI");
    let roboInfoDiv = $("<div></div>").addClass("unitInfo");
    roboInfoDiv.append($(`<img src=${dmgImg} width=20 height=20></img>`).addClass("img1"))
    roboInfoDiv.append($('<div>5</div>').addClass("text text1"))
    roboInfoDiv.append($(`<img src=${hpImg} width=20 height=20></img>`).addClass("img2"));
    roboInfoDiv.append($('<div>25</div>').addClass("text text2"))
    roboInfoDiv.append($(`<img src=${speedImg} width=20 height=20></img>`).addClass("img3"));
    roboInfoDiv.append($('<div>3</div>').addClass("text text3"))
    roboInfoDiv.append($(`<img src=${atkSpeedImg} width=20 height=20></img>`).addClass("img4"));
    roboInfoDiv.append($('<div>2</div>').addClass("text text4"))
    roboInfoDiv.append($(`<img src=${rangeImg} width=20 height=20></img>`).addClass("img5"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text5"))
    roboInfoDiv.append($(`<img src=${aoeImg} width=20 height=20></img>`).addClass("img6"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text6"))
    roboUnit1.append(roboInfoDiv);
    let title = $("<div>Archer Bot</div>").addClass("title");
    roboUnit1.append(title);
    store.append(roboUnit1);
    return roboUnit1;
}

function getDiv3(){
    let roboUnit1 = $("<div></div>").addClass("roboUnit");
    let img = $(`<img src=${robo3Mug} id="roboImage3" width=50 height=50 ></img>`).addClass("unitImg");
    img.ondragstart = function() {return false;} //prevents NORMAL dragging.
    roboUnit1.append($("<div></div>").addClass("unitImgHolder").append(img));//.css('object-fit','fill'));
    //let infoHolder1 = $("<div></div>").addClass("roboI");

    let roboInfoDiv = $("<div></div>").addClass("unitInfo");
    roboInfoDiv.append($(`<img src=${dmg} width=20 height=20></img>`).addClass("img1"))
    roboInfoDiv.append($('<div>5</div>').addClass("text text1"))
    roboInfoDiv.append($(`<img src=${hp} width=20 height=20></img>`).addClass("img2"));
    roboInfoDiv.append($('<div>25</div>').addClass("text text2"))
    roboInfoDiv.append($(`<img src=${speed} width=20 height=20></img>`).addClass("img3"));
    roboInfoDiv.append($('<div>3</div>').addClass("text text3"))
    roboInfoDiv.append($(`<img src=${atkSpeed} width=20 height=20></img>`).addClass("img4"));
    roboInfoDiv.append($('<div>2</div>').addClass("text text4"))
    roboInfoDiv.append($(`<img src=${range} width=20 height=20></img>`).addClass("img5"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text5"))
    roboInfoDiv.append($(`<img src=${aoe} width=20 height=20></img>`).addClass("img6"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text6"))
    roboUnit1.append(roboInfoDiv);

    let title = $("<div>Archer Bot</div>").addClass("title");
    roboUnit1.append(title);
    store.append(roboUnit1);

    return roboUnit1;


}

function getDiv4(){

    let roboUnit1 = $("<div></div>").addClass("roboUnit").css('bottom','10px');
    roboUnit1.append($("<div></div>").addClass("unitImgHolder").append($(`<img src=${robo4Mug} id="roboImage4" width=50 height=50 ></img>`).addClass("unitImg")));//.css('object-fit','fill'));
    //let infoHolder1 = $("<div></div>").addClass("roboI");
    let roboInfoDiv = $("<div></div>").addClass("unitInfo");
    roboInfoDiv.append($(`<img src=${dmg} width=20 height=20></img>`).addClass("img1"))
    roboInfoDiv.append($('<div>5</div>').addClass("text text1"))
    roboInfoDiv.append($(`<img src=${hp} width=20 height=20></img>`).addClass("img2"));
    roboInfoDiv.append($('<div>25</div>').addClass("text text2"))
    roboInfoDiv.append($(`<img src=${speed} width=20 height=20></img>`).addClass("img3"));
    roboInfoDiv.append($('<div>3</div>').addClass("text text3"))
    roboInfoDiv.append($(`<img src=${atkSpeed} width=20 height=20></img>`).addClass("img4"));
    roboInfoDiv.append($('<div>2</div>').addClass("text text4"))
    roboInfoDiv.append($(`<img src=${range} width=20 height=20></img>`).addClass("img5"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text5"))
    roboInfoDiv.append($(`<img src=${aoe} width=20 height=20></img>`).addClass("img6"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text6"))
    roboUnit1.append(roboInfoDiv);

    let title = $("<div>Archer Bot</div>").addClass("title");
    roboUnit1.append(title);
    store.append(roboUnit1);

    return roboUnit1;


}

function getDiv5(){
    let roboUnit1 = $("<div></div>").addClass("roboUnit");
    roboUnit1.append($("<div #unitImgHolder5></div>").addClass("unitImgHolder").append($(`<img src=${robo5Mug} id="roboImage5" width=50 height=50 ></img>`).addClass("unitImg")));//.css('object-fit','fill'));
    //let infoHolder1 = $("<div></div>").addClass("roboI");
    let roboInfoDiv = $("<div></div>").addClass("unitInfo");
    roboInfoDiv.append($(`<img src=${dmg} width=20 height=20></img>`).addClass("img1"))
    roboInfoDiv.append($('<div>5</div>').addClass("text text1"))
    roboInfoDiv.append($(`<img src=${hp} width=20 height=20></img>`).addClass("img2"));
    roboInfoDiv.append($('<div>25</div>').addClass("text text2"))
    roboInfoDiv.append($(`<img src=${speed} width=20 height=20></img>`).addClass("img3"));
    roboInfoDiv.append($('<div>3</div>').addClass("text text3"))
    roboInfoDiv.append($(`<img src=${atkSpeed} width=20 height=20></img>`).addClass("img4"));
    roboInfoDiv.append($('<div>2</div>').addClass("text text4"))
    roboInfoDiv.append($(`<img src=${range} width=20 height=20></img>`).addClass("img5"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text5"))
    roboInfoDiv.append($(`<img src=${aoe} width=20 height=20></img>`).addClass("img6"));
    roboInfoDiv.append($('<div>1</div>').addClass("text text6"))
    roboUnit1.append(roboInfoDiv);

    let title = $("<div>Healer Bot</div>").addClass("title");
    roboUnit1.append(title);
    store.append(roboUnit1);

    return roboUnit1;

}