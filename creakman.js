function rng(max) {
    return (Math.floor(Math.random() * max)) + 1;
}
moveList = { "Bite": { "func": moveBite, "pp": 1, "damaging": true, "damage": 1 }, "Heal": { "func": moveHeal, "pp": 1, "healing": true, "heal": 3 }, "Sleep": { "pp": 2, "special": true, "func": (user, target) => { if (rng(3) == 3) { target.applyEffectSleep } } } }

function moveBite(user, target) {
    if (user.pp >= moveList.Bite.PP) {
        target.damage(1)
        user.pp -= 1
    } else return 0
}
function move(move, user, target = user) {
    const moveToDo = moveList[move]
    if (move in moveList) {
        console.log(`${user.pp} THIS ONE`)
        if (user.pp >= moveToDo.pp) {
            if (moveToDo.damaging) {
                console.log(move)
                target.damage(moveToDo.damage)
            }
            if (moveToDo.healing) {
                console.log(move)
                console.log(target)
                target.heal(moveToDo.heal)
            }

        }

    } else return 0
}
function moveHeal(user) {
    if (user.pp >= 1) {
        user.heal(3)
    } else return 0
}
class Creakman {

    constructor(nickname = 'Default Creakman', level = 1, hp = 1, pp = 1) {
        this.nickname = nickname
        this.level = level
        this.hp = hp
        this.pp = pp
        this.effects = {}
    }
    stats() {
        console.log(`${this.nickname} ${this.level} ${this.hp} ${this.pp}`)
    }
    damage(amt = 0) {
        this.hp -= amt
    }
    heal(amt = 0) {
        this.hp += amt
    }

}
class CreakmanChair extends Creakman {
    constructor(
        nickname = 'Chair',
        level,
        hp = 10,
        pp = 5) {
        super(nickname, level, hp, pp)
        this.moves = ["Bite", "Heal"]

    }
    useMove(moveName, target) {
        if (this.moves.includes(moveName)) {
            move(moveName, this, target)
        }
    }
}
const chair = new CreakmanChair('Chair', 11)
const chairEvil = new CreakmanChair('Evil Chair', 111)
chair.stats()
console.log(moveList)
console.log(rng(2))
console.log(JSON.stringify(moveList))
console.log(chair.pp)
console.log(chairEvil.hp)
chair.useMove("Bite", chairEvil)
console.log(chair.pp)
console.log(chairEvil.hp)
chairEvil.useMove("Heal")
console.log(chairEvil.hp)