const canvas = document.getElementById("network")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let nodes = []

for(let i=0;i<80;i++){

nodes.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-.5),
vy:(Math.random()-.5)
})

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

nodes.forEach(n=>{

n.x+=n.vx
n.y+=n.vy

if(n.x<0||n.x>canvas.width)n.vx*=-1
if(n.y<0||n.y>canvas.height)n.vy*=-1

ctx.beginPath()
ctx.arc(n.x,n.y,2,0,Math.PI*2)
ctx.fillStyle="#3be4ff"
ctx.fill()

})

for(let i=0;i<nodes.length;i++){

for(let j=i;j<nodes.length;j++){

let dx=nodes[i].x-nodes[j].x
let dy=nodes[i].y-nodes[j].y
let dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.beginPath()
ctx.moveTo(nodes[i].x,nodes[i].y)
ctx.lineTo(nodes[j].x,nodes[j].y)
ctx.strokeStyle="rgba(59,228,255,.15)"
ctx.stroke()

}

}

}

requestAnimationFrame(animate)

}

animate()
