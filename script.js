class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
        this.startCount = 0;
    }

    create() {
        this.matter.add.gameObject(this.add.rectangle(10, 10, 20, 1600, 0x4a1204))
            .setStatic(true);
        this.matter.add.gameObject(this.add.rectangle(10, 10, 1600, 20, 0x4a1204))
            .setStatic(true);
        this.matter.add.gameObject(this.add.rectangle(790, 10, 20, 1600, 0x4a1204))
            .setStatic(true);
        this.matter.add.gameObject(this.add.rectangle(10, 790, 1600, 20, 0x4a1204))
            .setStatic(true);
        
        this.matter.add.gameObject(this.add.rectangle(368, 350, 100, 10, 0xd4c36e))
            .setStatic(true)
            .setAngle(-45);
        this.matter.add.gameObject(this.add.rectangle(432, 350, 100, 10, 0xd4c36e))
            .setStatic(true)
            .setAngle(45);

        this.hole = this.matter.add.gameObject(this.add.ellipse(400, 375, 20, 20, 0x101010))
            .setCircle(10)
            .setStatic(true);

        this.ball = this.matter.add.gameObject(this.add.ellipse(400, 750, 15, 15, 0xFAFAFA))
            .setCircle(7.5)
            .setCircle(7.5)
            .setBounce(1)
            .setFriction(0, .005, 0)

        this.reticle = this.add.rectangle(0, -40, 5, 40, 0xFAFAFA)
        this.path = this.add.rectangle(0, -1060, 5, 2000, 0x999999).setAlpha(.2)
        this.container = this.add.container(400, 750, [this.reticle, this.path]);

        this.timerEvent = this.time.addEvent({delay: 3000, repeat: -1});

        this.input.once('pointerdown', () => {
            this.ball.setVelocity(
                15 * Math.sin(this.container.angle * Math.PI / 180), 
                -15 * Math.cos(this.container.angle * Math.PI / 180))
            this.container.destroy();
        })

    }

    update() {
        let progress = this.timerEvent.getProgress();
        if (progress < .5) {
            this.container.setAngle(360 * progress - 90);
        } else {
            this.container.setAngle(270 - 360 * progress);
        }
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 800,
    backgroundColor: 0x214026,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
        }
    },
    scene: [Level1],
}

let game = new Phaser.Game(config);

