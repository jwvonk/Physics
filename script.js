class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
        this.startCount = 0;
    }

    create() {
        this.startCount++;
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
            .setOnCollideWith(this.hole, () => this.scene.start('score1', {score: this.startCount }));

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

        let x = this.ball.getVelocity().x;
        let y = this.ball.getVelocity().y;
        if (x != 0 && y != 0 && Math.abs(x) < .1 && Math.abs(y) < .1) {
            this.scene.start('level1');
        }
    }
}

class Score1 extends Phaser.Scene {
    init(data) {
        this.score = data.score;
    }

    constructor() {
        super("score1")
    }

    create() {
        this.add.text(50, 50, "Your score was: " + this.score + ".").setFontSize(50);
        this.add.text(50, 100, "Click to proceed.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('level2'));
    }
}

class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
        this.startCount = 0;
    }

    create() {
        this.startCount++;
        console.log('Scene started', this.startCount, 'times.');
        this.matter.add.gameObject(this.add.rectangle(10, 10, 20, 1600, 0x4a1204))
            .setStatic(true);
        this.matter.add.gameObject(this.add.rectangle(10, 10, 1600, 20, 0x4a1204))
            .setStatic(true);
        this.matter.add.gameObject(this.add.rectangle(790, 10, 20, 1600, 0x4a1204))
            .setStatic(true);
        this.matter.add.gameObject(this.add.rectangle(10, 790, 1600, 20, 0x4a1204))
            .setStatic(true);

        this.matter.add.gameObject(this.add.rectangle(300, 130, 100, 10, 0xd4c36e))
            .setStatic(true)
            .setAngle(-50)
        this.matter.add.gameObject(this.add.rectangle(439, 189, 300, 10, 0xd4c36e))
            .setStatic(true)
            .setAngle(40)
        this.matter.add.gameObject(this.add.rectangle(458, 322, 500, 10, 0xd4c36e))
            .setStatic(true)
            .setAngle(40)
        this.matter.add.gameObject(this.add.rectangle(775, 470, 10, 100, 0xd4c36e))
            .setStatic(true)

        this.hole = this.matter.add.gameObject(this.add.ellipse(330, 152, 20, 20, 0x101010))
            .setCircle(10)
            .setStatic(true);

        this.ball = this.matter.add.gameObject(this.add.ellipse(400, 750, 15, 15, 0xFAFAFA))
            .setCircle(7.5)
            .setBounce(1)
            .setFriction(0, .005, 0)
            .setOnCollideWith(this.hole, () => this.scene.start('score2', {score: this.startCount }));

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

        let x = this.ball.getVelocity().x;
        let y = this.ball.getVelocity().y;
        if (x != 0 && y != 0 && Math.abs(x) < .1 && Math.abs(y) < .1) {
            this.scene.start('level2');
        }
    }
}

class Score2 extends Phaser.Scene {
    init(data) {
        this.score = data.score;
    }

    constructor() {
        super("score2")
    }

    create() {
        this.add.text(50, 50, "Your score was: " + this.score + ".").setFontSize(50);
        this.add.text(50, 100, "Click to proceed.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('level3'));
    }
}

class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
        this.startCount = 0;
    }

    create() {
        this.startCount++;
        this.matter.add.gameObject(this.add.rectangle(10, 10, 20, 1600, 0x4a1204))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(10, 10, 1600, 20, 0x4a1204))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(790, 10, 20, 1600, 0x4a1204))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(10, 790, 1600, 20, 0x4a1204))
            .setStatic(true)

        this.matter.add.gameObject(this.add.rectangle(350, 475, 10, 400, 0xd4c36e))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(450, 475, 10, 400, 0xd4c36e))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(400, 150, 600, 10, 0xd4c36e))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(105, 208, 10, 125, 0xd4c36e))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(695, 208, 10, 125, 0xd4c36e))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(227, 275, 255, 10, 0xd4c36e))
            .setStatic(true)
        this.matter.add.gameObject(this.add.rectangle(573, 275, 255, 10, 0xd4c36e))
            .setStatic(true)

        this.hole = this.matter.add.gameObject(this.add.ellipse(600, 215, 20, 20, 0x101010))
            .setCircle(10)
            .setStatic(true);

        this.ball = this.matter.add.gameObject(this.add.ellipse(400, 750, 15, 15, 0xFAFAFA))
            .setCircle(7.5)
            .setBounce(1)
            .setFriction(0, .005, 0)
            .setOnCollideWith(this.hole, () => this.scene.start('score2', {score: this.startCount }));

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

        let x = this.ball.getVelocity().x;
        let y = this.ball.getVelocity().y;
        if (x != 0 && y != 0 && Math.abs(x) < .1 && Math.abs(y) < .1) {
            this.scene.start('level3');
        }
    }
}

class Score3 extends Phaser.Scene {
    init(data) {
        this.score = data.score;
    }

    constructor() {
        super("score3")
    }

    create() {
        this.add.text(50, 50, "Your score was: " + this.score + ".").setFontSize(50);
        this.add.text(50, 100, "Click to proceed.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('level1'));
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
    scene: [Level1, Score1],
}

let game = new Phaser.Game(config);

