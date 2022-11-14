class Scene4 extends Phaser.Scene 
{
    init(data)
    {
        this.venceu = data.venceu;
        this.tempo = data.tempo;
        this.tentativas = data.tentativas;
        this.erros = data.erros;
    }

    constructor()
    {
        super("fimGame");
    }

    create()
    {
        //ASSETS
        //vitoria
        if (this.venceu) 
        {
            this.background = this.add.sprite(0, 0, "background-venceu");
            this.background.play("bg_anim3");
            this.timerText = this.add.bitmapText(this.cameras.main.width/2 - 275, this.cameras.main.height/2 - 60, "pixelFont", ("Tempo: " + this.tempo), 40);
            this.tentativasText = this.add.bitmapText(this.cameras.main.width/2 - 275, this.cameras.main.height/2 - 20, "pixelFont", ("Tentativas: " + this.tentativas), 40);
            this.errosText = this.add.bitmapText(this.cameras.main.width/2 - 275, this.cameras.main.height/2 + 20, "pixelFont", ("Erros: " + this.erros), 40);
        }
        //derrota
        else 
        {
            this.background = this.add.image(0, 0, "background-perdeu");
        }  
        

        //botao de jogar novamente
        this.background.setOrigin(0,0);
        this.retry = this.add.sprite(this.cameras.main.width/2 - 275,   this.cameras.main.height/2 + 80, "retrybt").setName('retry').setInteractive();
        this.retry.setOrigin(0,0);
        //HOVER
        this.input.on('gameobjectover', (pointer, gameObject) => {if (gameObject.name === 'retry') this.retry.setTexture("retryhover");});
        this.input.on('gameobjectout', (pointer, gameObject) => {if (gameObject.name === 'retry') this.retry.setTexture("retrybt");});
        //CHAMA JOGO
        this.input.on('gameobjectdown',(pointer, gameObject) =>
        {
            if (gameObject.name === 'retry') 
            {
               this.sound.removeByKey('music');
               this.scene.start("bootGame"); 
            }
        }, this);
    }
}