//Universal variables
var GameState = "Story";

var IMG = 1, scale = 1;

var life = 3;
var score = 0;

var bg;

var i = 0;
var o = 0;

var barrier1, barrier2;

//Story level variables
var button;

//Level 1 variables
var EnemySpaceship1;
var Player;
var blastSprite;
var bullet;
var Missiles;
var EnemySpaceship1Grp, MissilesGrp, BulletsGrp;
var SquadronSpaceship;
var celebration;

//Variables for Images
var PlayerImg;
var EnemySpaceship1Img, EnemySpaceship2Img, EnemySpaceship3Img,
    EnemySpaceship4Img, EnemySpaceship5Img;
var SquadronSpaceshipImg;
var MissilesImg, bulletsImg;
var livesImg;
var blastAnimation;
var celebrationAnimation;

//variables for sounds
var gunShot;
var blast;

function preload(){
    PlayerImg = loadImage("images/Player Spaceship.png");
    bulletsImg = loadImage("images/bullet.png");

    bg = loadImage("images/Background.gif");

    livesImg = loadImage("images/Lives.png");

    SquadronSpaceshipImg = loadImage("images/Squadron Spaceship.png")

    blastAnimation = loadAnimation("images/Blast1.png", "images/Blast2.png", "images/Blast3.png", "images/Blast4.png", "images/Blast5.png", "images/Blast6.png", "images/Blast7.png");
    celebrationAnimation = loadAnimation("images/Firecrackers1.png", "images/Firecrackers2.png", "images/Firecrackers3.png", "images/Firecrackers4.png", "images/Firecrackers5.png", "images/Firecrackers6.png", "images/Firecrackers7.png", "images/Firecrackers8.png", "images/Firecrackers8.png");
    gunShot = loadSound("sounds/bullets.mp3");
    blast = loadSound("sounds/blast.mp3");
}
function setup(){
    createCanvas(displayWidth-40, displayHeight-30);

    //The player Sprite and spaceship we'll add Image afterwards
    player = createSprite(width/2, height-70, 150, 150);
    player.addImage(PlayerImg);
    player.scale = 0.4;
    player.setCollider("circle", 0, 0, 150)

    button = createButton("Play");
    button.position(displayWidth - 150, displayHeight - 30);
    button.style('background', 'yellow');
    button.size(75, 50);

    barrier1 = createSprite(0, displayHeight/2, 2, displayHeight);
    barrier1.visibility = false;

    barrier2 = createSprite(displayWidth-40, displayHeight/2, 2, displayHeight);
    barrier2.visibility = false;

    //Creating Groups For level1 variables
    EnemySpaceship1Grp = new Group();
    MissilesGrp = new Group();
    BulletsGrp = new Group();
    
}

function draw(){
    background(bg);
    textSize(20);
    
    if(GameState === "Story")
    {
        textAlign(CENTER);
        textSize(25)
        text("I am a space warrior. My name is Jones Alex Carl Orion Balcum lll.Jacob for short.", displayWidth/2, 50);
        text("I am fighting against the species of planet Exo21A. The species name is giraffa sapiens.", displayWidth/2, 100);
        text("They have decided to take over our Balaria, our planet, that is why we are fighting.", displayWidth/2, 150);
        text("I am on a mission to defeat one of their squadron. Who are disturbing our Planet.", displayWidth/2, 200);

        text("Rules", displayWidth/2, 350);
        text("Rule 1: Don't let the spaceships touch you, else you will lose a life everytime.", displayWidth/2, 380);
        text("Rule 2: Remember that you only have three lives.", displayWidth/2, 410);
        text("Rule 3: You have to shoot as many spaceships as you can.", displayWidth/2, 440);
        text("Rule 4: You earn 50 points everytime you destroy a spaceship, and your target is 2500", displayWidth/2, 470);

        text("Instructions : Press 'S' to fire bullets and you can only fire 5 bullets at a time.", displayWidth/2, 570);
        text("Press left and right arrow keys to move in those directions to dodge some spaceships.", displayWidth/2, 610);

        button.mousePressed(()=>
        {
            GameState = "Play";
            button.hide();
        })
    }

    if(GameState === "Play")
    {
        text("Score : " + score, 50, 50);

        player.collide(barrier1);
        player.collide(barrier2);

        var x = 50;
        for(var v = 1; v <= life; v++)
        {
            image(livesImg, x, 75, 50, 50);

            x += 50;
        }
        if(keyIsDown(LEFT_ARROW))
        {
            player.x -= 2;
        }

        if(keyIsDown(RIGHT_ARROW))
        {
            player.x += 2;
        }

        if(frameCount % 150 === 0)
        {
            SpawnSpaceships1();
        }

        for(i = 0; i < EnemySpaceship1Grp.length; i++)
        {
            for(o = 0; o < BulletsGrp.length; o++)
            {
                if(EnemySpaceship1Grp.get(i).isTouching(BulletsGrp.get(o)))
            {
                EnemySpaceship1Grp.get(i).destroy();
                BulletsGrp.get(o).destroy();
                score += 50;            
            }
            }
            if(EnemySpaceship1Grp.get(i).isTouching(player))
            {
                EnemySpaceship1Grp.get(i).destroy();
                life -= 1;
            }
        }

        if(life === 0 && GameState === "Play")
        {
            GameState = "Lose";
            
            
        }

        if(GameState === "Play" && score >= 500)
        {
            bg = "lightblue";
            GameState = "Won";
        }

        
        drawSprites();
    }

    if(GameState === "Won")
        {
            textAlign(CENTER);
            stroke("orange");
            fill("orange")
            EnemySpaceship1Grp.destroyEach();
            BulletsGrp.destroyEach();
            blastSprite = createSprite(displayWidth/2, displayHeight/2, 150, 150);
           // for(p = 0; p < 200; p++){
            blastSprite.scale = 5;
            blastSprite.addAnimation("celebrate", celebrationAnimation);
            blastSprite.frameDelay=10;
            drawSprites();
          //  }

            textSize(25);
            text("Score : "+score, displayWidth/2, displayHeight/2-50);
            text("You have cleared level 1", displayWidth/2, displayHeight/2);

            
        }
        if(GameState === "Lose")
        {
           // blast.play();
            blastSprite = createSprite(player.x, player.y, player.width, player.height);
            blastSprite.scale = 2;
            blastSprite.addAnimation("blast", blastAnimation);
            blastSprite.frameDelay=10;
            drawSprites();
            textAlign(CENTER);
            stroke("green");
            textSize(25);
            text("You Lose", displayWidth/2-20, displayHeight/2-20);

        }
}

function SpawnBullets()
{
    bullet = createSprite(player.x, player.y-30, 10, 10);
    bullet.velocityY = -1.5;
    bullet.addImage(bulletsImg);
    bullet.scale = 0.1;
    bullet.lifetime = 400;
    BulletsGrp.add(bullet);

    gunShot.play();

    BulletsGrp.setLifetimeEach(400);

}
function SpawnSpaceships1()
{
    var b = 85;
    var s = 1;
    switch(IMG)
        {
            case(1):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship1.png");
            IMG++;
            s = 0.75;
            break;

            case(2):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship2.png");
            IMG++;
            s = 1;
            break;

            case(3):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship3.png");
            IMG++;
            break;

            case(4):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship4.png");
            IMG++;
            break;

            case(5):
            EnemySpaceship1Img = loadImage("images/Enemy Spaceship5.png");
            IMG = 1;

            break;

            default: break;
        }
    for(var a = 0; a <= 5; a++)
    {
                
        EnemySpaceship1 = createSprite(b, 50, 75, 75);
        b += 225;
        
        EnemySpaceship1.addImage(EnemySpaceship1Img);
        EnemySpaceship1.scale = s;

        EnemySpaceship1Grp.add(EnemySpaceship1);
        
    }
    EnemySpaceship1Grp.setVelocityYEach(2);
    EnemySpaceship1Grp.setLifetimeEach(350);
}

function keyPressed()
{
    if(GameState === "Play" && keyCode === 115 || keyCode === 83 && BulletsGrp.length < 5)
    {
        SpawnBullets();
    }
}