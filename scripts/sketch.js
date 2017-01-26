
var windowsize = 600

canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")

running = false
Debug = false
gridsize = 100
Grid = []
Caver1 = new caver(1, 1, Grid)
function Setup() {
    
    
    for (i = 0; i < gridsize; i++) {
        Grid[i] = []
        for (j = 0; j < gridsize; j++) {
            Grid[i][j] = 1
        }
    }
    
    ctx.clearRect(0, 0, windowsize, windowsize)
    gridscale = windowsize / gridsize
    for (i = 0; i < Grid.length; i++) {
        for (j = 0; j < Grid.length; j++) {
            ctx.fillStyle = gridcolors[Grid[i][j]]
            ctx.fillRect(i * gridscale, j * gridscale, gridscale, gridscale)
        }
    }
    if (!running) {
        Draw()
        running = true
    }
}
gridcolors = ["rgba(255,255,255,255)", "rgba(0,0,0,1)"]

stepsize = 1
function Draw() {
    if (Debug) {
        
    }

//ctx.clearRect(0, 0, 600, 600)
    gridscale = windowsize/gridsize
for (i = 0; i < Grid.length; i++) {
    for (j = 0; j < Grid.length; j++) {
        ctx.fillStyle = gridcolors[Grid[i][j]]
       // ctx.fillRect(i * gridscale, j * gridscale, gridscale, gridscale)
    }
}
Caver1.run(stepsize)

   

    if (Debug) {

    }
    requestAnimationFrame(Draw) 
}

function caver(x, y, grid) {
    this.pos = {x:x,y:y}
    this.grid = grid
    this.pathmem = []
    this.directiondefinitions = { left: { x: -1, y: 0 }, right: { x: +1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: +1 } }
    this.finished = false
    this.run = function (steps) {
        directions = []
        step = steps
        while (!this.finished & step > 0) {
            step--
            directions = []
            if (this.grid[this.pos.x - 2]) { if (this.grid[this.pos.x - 2][this.pos.y] == 1) { directions.push("left") } }
            if (this.grid[this.pos.x + 2]) { if (this.grid[this.pos.x + 2][this.pos.y] == 1) { directions.push("right") } }
            if (this.grid[this.pos.x][this.pos.y - 2] == 1) { directions.push("up") }
            if (this.grid[this.pos.x][this.pos.y + 2] == 1) { directions.push("down") }

            if (directions.length != 0) {
                directionname = directions[Math.floor(Math.random() * directions.length)]
                direction = this.directiondefinitions[directionname]

                this.grid[this.pos.x][this.pos.y] = 0

                this.pathmem.push({ x: this.pos.x, y: this.pos.y })
                this.pos.x += direction.x
                this.pos.y += direction.y

                ctx.fillStyle = "rgba(0,0,255,1)"
                ctx.fillRect(this.pos.x * gridscale, this.pos.y * gridscale, gridscale, gridscale)

                this.grid[this.pos.x][this.pos.y] = 0

                this.pathmem.push({ x: this.pos.x, y: this.pos.y })
                this.pos.x += direction.x
                this.pos.y += direction.y

                ctx.fillStyle = "rgba(0,0,255,1)"
                ctx.fillRect(this.pos.x * gridscale, this.pos.y * gridscale, gridscale, gridscale)

                this.grid[this.pos.x][this.pos.y] = 0

            } else {
                if (!this.pos) {
                    this.finished = true
                } else {
                    ctx.fillStyle = "rgba(255,255,255,1)"
                    ctx.fillRect(this.pos.x * gridscale, this.pos.y * gridscale, gridscale, gridscale)
                    this.pos = this.pathmem.pop()
                    if (!this.pos) {
                        this.finished = true
                    } else {
                        ctx.fillStyle = "rgba(255,255,255,1)"
                        ctx.fillRect(this.pos.x * gridscale, this.pos.y * gridscale, gridscale, gridscale)
                        this.pos = this.pathmem.pop() || this.pos
                    }
                }
            }

        }
    }
}


