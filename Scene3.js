class Scene3 extends Phaser.Scene 
{
    init(data)
    {
        this.bancoPalavras = data.bancoPalavras;
    }

    constructor()
    {
        super("menuGame");
    }

    preload()
    {
        
    }

    create()
    {
        //MUSICA
        var music = this.sound.add("music");
        var musicConfig =
        {
            volume: 0.2,
            loop: true
        };
        music.play(musicConfig);

        //ASSETS
        this.background = this.add.sprite(0, 0, "background-inicio");
        this.background.setOrigin(0,0);
        this.background.play("bg_anim2");
        this.florInicio = this.add.sprite(0, 0, "flor-inicio");
        this.florInicio.setOrigin(0,0);
        this.florInicio.play("florinicio_anim");
        this.inicia = this.add.sprite(this.cameras.main.width/2,   this.cameras.main.height/2 + 70, "iniciobtn").setName('inicia').setInteractive();

        //HOVER
        this.input.on('gameobjectover', (pointer, gameObject) => {if (gameObject.name === 'inicia') this.inicia.setTexture("iniciobtnhover");});
        this.input.on('gameobjectout', (pointer, gameObject) => {if (gameObject.name === 'inicia') this.inicia.setTexture("iniciobtn");});
        
        //CHAMA JOGO
        this.input.on('gameobjectdown',(pointer, gameObject) =>
        {
            if (gameObject.name === 'inicia') 
            {
               this.scene.start("playGame", {bancoPalavras: this.bancoPalavras}); 
            }
        }, this);
    }
}