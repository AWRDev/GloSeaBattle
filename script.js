const record = document.getElementById('record')
const shot = document.getElementById('shot')
const hit = document.getElementById('hit')
const dead = document.getElementById('dead')
const enemy = document.getElementById('enemy')
const again = document.getElementById('again')
const header = document.querySelector('.header')


const game = {
    ships: [
        {
            location: [26, 36, 46, 56],
            hit: ['','','','']
        },
        {
            location: [11, 12, 13],
            hit: ['','','']
        },
        {
            location: [69, 79],
            hit: ['','']
        },
        {
            location: [32],
            hit: ['']
        }
    ],
    shipCount: 4
}


const play = {
    record: localStorage.getItem('record'),
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data){
        this[data] += 1
        this.render()
    },
    render(){
        record.textContent = this.record
        shot.textContent = this.shot
        hit.textContent = this.hit
        dead.textContent = this.dead
    }
};

const show = {
    hit(elem){
        this.changeClass(elem, 'hit')
    },
    miss(elem){
        this.changeClass(elem, 'miss')
    },
    dead(elem){
        this.changeClass(elem, 'dead')
    },
    changeClass(elem, value){
        elem.className = value;
    }
}

const fire = (event) => {
    if(event.target.className || event.target.tagName != 'TD'){ //Checking if object has some class assignment. If it has then we do nothing
        return
    }
    const target = event.target
    show.miss(target)

    play.updateData = 'shot'

    for(let i=0; i<game.ships.length; i++){
        const ship = game.ships[i]
        const index = ship.location.indexOf(parseInt(target.id))
        console.log(index)
        if(index >= 0){
            show.hit(target)
            play.updateData = 'hit'
            ship.hit[index] = 'x'
            const life = ship.hit.indexOf('')
            if(life === -1){
                play.updateData = 'dead'
                for(const cell of ship.location){
                    show.dead(document.getElementById(cell))
                }

                game.shipCount--

                if(game.shipCount == 0){
                    header.textContent = 'Игра окончена'
                    enemy.removeEventListener('click', fire)

                    if(play.shot<play.record || play.record == 0){
                        localStorage.setItem('record', play.shot)
                        play.record = play.shot
                        play.render()
                    }
                }
            }
            
        }
    }
}

const init = () => {
    enemy.addEventListener('click', fire) //It would be better to check it here but 
    play.render()

    again.addEventListener('click', () => {
        location.reload()
    })
}

init()