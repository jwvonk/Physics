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

