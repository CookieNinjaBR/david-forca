class Scene2 extends Phaser.Scene 
{
    init(data)
    {
        this.bancoPalavras = data.bancoPalavras;
    }

    constructor()
    {
        super("playGame");
    }
    
    create()
    {
        //VARIAVEIS DO JOGO
        var vida = 6;
        var tentativas = 0;
        var erros = 0;
        var palavra = String(escolhePalavra(this.bancoPalavras));
        var tracinhos = [];
        for(let i=0; i<palavra.length; i++) tracinhos[i] = " _"
        var tecla = '';
        
        
        //ASSETS
        this.background  = this.add.sprite(0, 0, "background");
        this.background.setOrigin(0,0);
        this.background.play("bg_anim1");
        this.volta       = this.add.image(30, 30, "volta").setName('volta').setInteractive();
        this.davidDog    = this.add.sprite(this.cameras.main.width/2 - 200, this.cameras.main.height/2 + 60, "david");
        this.davidPatas  = this.add.sprite(this.cameras.main.width/2 - 210, this.cameras.main.height/2 + 100, "davidpatas");
        this.davidFlor   = this.add.sprite(this.cameras.main.width/2 - 210, this.cameras.main.height/2 + 150, "flor6");
        this.davidPetala = this.add.sprite(this.cameras.main.width/2 - 240, this.cameras.main.height/2 + 150, "petala");
        this.davidPetala.play("petala_cai");
        this.davidPetala.visible = false;
        this.palavraVisual = this.add.bitmapText(15, this.cameras.main.height/2 - 150, "pixelFont", "", 45);
        for(let i=0; i<palavra.length; i++) this.palavraVisual.text = this.palavraVisual.text + tracinhos[i];
        this.davidDog.play("david_pisca");
        

        //TIMER E PLACAR
        this.timeTaken = -1;
        this.timerText = this.add.bitmapText(this.cameras.main.width - 200, 0, "pixelFont", "", 30);
        this.tentativasText = this.add.bitmapText(this.cameras.main.width - 200, 25, "pixelFont", "Tentativas: 0", 30);
        this.errosText = this.add.bitmapText(this.cameras.main.width - 200, 50, "pixelFont", "Erros: 0", 30);
        const updateTimer = () => 
        {
            this.timeTaken += 1;
            this.timerText.text = "Tempo: " + formatTime(this.timeTaken);
        }
        
        updateTimer();
        this.time.addEvent({ delay: 1000, callback: updateTimer, callbackScope: this, loop: true });

        
        //TECLADO DIGITAL 
        //LETRAS
        //variaveis de posicao
        let letramin = 97;
        let hInicial = -120
        //linhas 1-5
        for (let i = 0; i < 5; i++)         
        {
            let wInicial = 108;
            hInicial = hInicial + 48;
            //colunas
            for(let j = 0; j<5; j++)        
            {
                let letraUpper = letramin - 32;
                this[String.fromCharCode(letramin)] = 
                    this.add.image(
                        this.cameras.main.width/2 + wInicial, 
                        this.cameras.main.height/2 + hInicial,  
                        String.fromCharCode(letramin)
                    )
                    .setName(String.fromCharCode(letraUpper))
                    .setInteractive();
                wInicial = wInicial + 48;
                letramin++;
            }
        }
        //linha 6
        this.z = this.add.image(this.cameras.main.width/2 + 156,  this.cameras.main.height/2 + 168, "z").setName('Z').setInteractive();
        //BOTAO CONFIRMA
        this.confirma = this.add.image(this.cameras.main.width/2 + 228, this.cameras.main.height/2 + 168, "confirma").setName('CNF').setInteractive();
        //HOVER TECLADO
        this.input.on('gameobjectover', function (pointer, gameObject) {gameObject.setAlpha(0.7);});
        this.input.on('gameobjectout', function (pointer, gameObject) {gameObject.setAlpha(1);});



        //JOGO 
        //escolhe tecla no teclado virtual
        this.input.on('gameobjectdown',(pointer, gameObject) =>
        {
            //se a ultima tecla digitada nao for vazia, limpa tint de selecao
            if(tecla!=='') this.children.getByName(tecla).clearTint();

            //checa a tecla
            switch (gameObject.name) 
            {
                //se a tecla for o botao volta, retorna pro menu inicial
                case 'volta':
                    this.sound.removeByKey('music');
                    this.scene.start("bootGame");
                    break;
                
                //se for a tecla confirma, roda cheque de letra
                case 'CNF':
                    if(tecla==='') return;                       //se nao tiver nada teclado, retorna                                                    
                    this.children.getByName(tecla).destroy();    //gameobject da tecla eh destruido, impedindo a repeticao de chutes
                    tentativas++;                                //incrementa var tentativas
                    this.tentativasText.text = "Tentativas: " + tentativas;   
                    
                    //checa se a palavra inclui a tecla 
                    if(palavra.includes(tecla))                 //se sim, substitui os tracinhos
                    {   
                        for(let i = 0; i<=palavra.length; i++)
                        if(tecla === palavra.charAt(i)) tracinhos[i] = ' ' + tecla; 
                        this.palavraVisual.text = '';
                        for(let i=0; i<palavra.length; i++) this.palavraVisual.text = this.palavraVisual.text + tracinhos[i];
                        for(let i=0; i<palavra.length; i++) 
                        {
                            if(this.palavraVisual.text.includes('_')) break;
                            else this.scene.start("fimGame", {venceu: true, tempo: formatTime(this.timeTaken), tentativas: tentativas, erros: erros});  
                        }
                    } 
                    else                                        //se nao, diminui a vida do jogador
                    {
                        //ANIMACOES PLAY
                        vida--;
                        erros++;
                        this.errosText.text = "Erros: " + erros;   
                        this.davidPatas.play("david_bate");
                        this.davidFlor.playAfterDelay("flor_bate", 220);
                        this.davidFlor.on('animationcomplete', () => 
                        {  
                            let prox = "flor" + vida;
                            this.davidFlor.setTexture(prox);
                            this.davidPetala.visible = true;
                        });
                    
                        //GAME OVER
                        if (vida===0) this.scene.start("fimGame", {venceu: false, tempo: formatTime(this.timeTaken), tentativas: tentativas, erros: erros});
                    }
                    //tecla resetada pra string vazio (pra nao dar erro com o lance do tint de selecao)
                    tecla = '';
                    break;

                default:
                    gameObject.setTint(0xA7A7A7);
                    tecla = gameObject.name;
                    break;
            }
        }, this);
    }

    update()
    {
        //animacao vertical da petala caindo
        this.davidPetala.y += 3;
        if(this.davidPetala.y > this.cameras.main.height - 4)  
        {
            this.davidPetala.y = this.cameras.main.height/2 + 140;
            this.davidPetala.visible = false;
        }
    }

}



//FUNCOES JOGO
function escolhePalavra(bancoPalavras)
{
    const indice = Math.floor(Math.random() * (bancoPalavras.length));
    return bancoPalavras[indice];
}

function movePetala(petala, velocidade)
{
    petala.y += velocidade;
    if(petala.y > config.height) 
    {
        petala.y = this.cameras.main.height/2 + 150;
    }
}

const formatTime = (seconds) =>
{
    var minutes = Math.floor(seconds/60);
    var partInSeconds = (seconds%60).toString();
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    partInSeconds = partInSeconds.substring(0,2);
    return minutes + ': ' + partInSeconds;
}


