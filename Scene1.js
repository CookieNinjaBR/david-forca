class Scene1 extends Phaser.Scene 
{
    constructor()
    {
        super("bootGame");
    }

    preload()
    {
        //CARREGA OS ASSETS
        this.load.spritesheet("david", "assets/daviddoggg.png",
        {
            frameWidth: 274,
            frameHeight: 276
        });
        this.load.spritesheet("davidpatas", "assets/davidpata.png",
        {
            frameWidth: 200,
            frameHeight: 160
        });
        this.load.spritesheet("davidfloranim", "assets/floranim.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor6", "assets/flor6.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor5", "assets/flor5.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor4", "assets/flor4.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor3", "assets/flor3.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor2", "assets/flor2.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("flor1", "assets/flor1.png",
        {
            frameWidth: 300,
            frameHeight: 131
        });
        this.load.spritesheet("petala", "assets/petala2.png",
        {
            frameWidth: 150,
            frameHeight: 76
        });
        this.load.spritesheet("background", "assets/bgnd3.jpeg",
        {
            frameWidth: 854,
            frameHeight: 480
        });
        
        this.load.spritesheet("background-inicio", "assets/iniciobg.jpeg",
        {
            frameWidth: 854,
            frameHeight: 480
        });

        this.load.spritesheet("flor-inicio", "assets/iniciobgflor4.png",
        {
            frameWidth: 854,
            frameHeight: 480
        });
        
        this.load.spritesheet("background-venceu", "assets/fim8.jpeg",
        {
            frameWidth: 854,
            frameHeight: 480
        });
        this.load.image("background-perdeu", "assets/fimp1.jpeg");
        this.load.spritesheet("iniciobtn", "assets/iniciobt.jpeg",
        {
            frameWidth: 243,
            frameHeight: 83
        });
        this.load.spritesheet("iniciobtnhover", "assets/iniciobthvr.jpeg",
        {
            frameWidth: 243,
            frameHeight: 83
        });
        this.load.spritesheet("retrybt", "assets/btnretry.jpeg",
        {
            frameWidth: 120,
            frameHeight: 82
        });
        this.load.spritesheet("retryhover", "assets/btnretryhv.jpeg",
        {
            frameWidth: 120,
            frameHeight: 82
        });
        this.load.image("volta", "assets/letras/volta.png");
        this.load.image("a", "assets/letras/a1.png");
        this.load.image("b", "assets/letras/b1.png");
        this.load.image("c", "assets/letras/c1.png");
        this.load.image("d", "assets/letras/d1.png");
        this.load.image("e", "assets/letras/e1.png");
        this.load.image("f", "assets/letras/f1.png");
        this.load.image("g", "assets/letras/g1.png");
        this.load.image("h", "assets/letras/h1.png");
        this.load.image("i", "assets/letras/i1.png");
        this.load.image("j", "assets/letras/j1.png");
        this.load.image("k", "assets/letras/k1.png");
        this.load.image("l", "assets/letras/l1.png");
        this.load.image("m", "assets/letras/m1.png");
        this.load.image("n", "assets/letras/n1.png");
        this.load.image("o", "assets/letras/o1.png");
        this.load.image("p", "assets/letras/p1.png");
        this.load.image("q", "assets/letras/q1.png");
        this.load.image("r", "assets/letras/r1.png");
        this.load.image("s", "assets/letras/s1.png");
        this.load.image("t", "assets/letras/t1.png");
        this.load.image("u", "assets/letras/u1.png");
        this.load.image("v", "assets/letras/v1.png");
        this.load.image("w", "assets/letras/w1.png");
        this.load.image("x", "assets/letras/x1.png");
        this.load.image("y", "assets/letras/y1.png");
        this.load.image("z", "assets/letras/z1.png");
        this.load.image("confirma", "assets/letras/cnf1.png");
        this.load.bitmapFont("pixelFont", "assets/font/fnt1_0.png", "assets/font/fnt1.fnt");
        this.load.audio("music", "assets/musiquinea/School Rooftop (Slowed Down Version).mp3")
    }

    create()
    {
        this.add.text(20, 20, "Loading game...");


        //CRIA BANCO DE PALAVRAS DEFAULT
        const bancoPalavras = ["ABACATE", "BANANA", "CASA", "DINHEIRO", "ELEFANTE", "FACA", "GATO", "HOMEM", "IGREJA", "JANELA", "KOALA", "LIMAO", "MACA", "NAVIO", "AMOR", "PAPAGAIO", "QUEIJO", "RATO", "SOL", "TIGRE", "UVA", "VACA", "XICARA", "YOGURTE", "ZEBRA", "AGUA", "ARVORE", "ONIBUS", "EGUA", "EPOCA", "EXITO", "ULTIMO", "IMPAR", "INDIO", "ICONE", "UNICO", "UMIDO", "IMPETO", "ULTIMA", "INDICE", "ICONE", "IMPAR", "INDIO", "ULTIMO", "UNICO"];

        
        //CRIA ANIMACOES
        this.anims.create(
        {
            key: "bg_anim1",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("background"),
            frameRate: 10,
            repeat: -1,  
        });

        this.anims.create(
        {
            key: "bg_anim2",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("background-inicio"),
            frameRate: 10,
            repeat: -1,  
        });

        this.anims.create(
        {
            key: "bg_anim3",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("background-venceu"),
            frameRate: 10,
            repeat: -1,  
        });

        this.anims.create(
        {
            key: "florinicio_anim",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("flor-inicio"),
            frameRate: 5,
            repeat: -1,  
            repeatDelay: 3000
        });

        this.anims.create(
        {
            key: "david_pisca",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("david"),
            frameRate: 10,
            repeat: -1,
            repeatDelay: 5000
        });

        this.anims.create(
        {
            key: "petala_cai",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("petala"),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create(
        {
            key: "david_bate",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("davidpatas"),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create(
        {
            key: "flor_bate",
            // @ts-ignore
            frames: this.anims.generateFrameNumbers("davidfloranim"),
            frameRate: 20,
            repeat: 0,  
        });

        
        //INICIA O JOGO
        this.scene.start("menuGame", {bancoPalavras: bancoPalavras});
    }
}