/** @type {HTMLCanvasElement} */


















const canvas = canvas1;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




ctx.fillStyle = 'white';




class Particle{
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 40 + 5;

    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 4 - 2;
  }
  
  draw(context){
    
    context.fillStyle = `hsl(${this.x * 0.5}, 100%, 50%)`;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    
  }
  
  update(){
    this.x += this.vx;
    
    this.y += this.vy;
    
    if(this.x > this.effect.width - this.radius || this.x < 0 + this.radius) this.vx *= -1;
    
    if(this.y > this.effect.height - this.radius || this.y < 0 + this.radius) this.vy *= -1;
  
    
  }
}



class Effect{
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    this.particles = [];
    this.numberOfParticle = 200;
    this.createParticles()
    
    
  }
  
  createParticles(){
    for(let i = 0; i < this.numberOfParticle; i++){
      this.particles.push(new Particle(this));
      // this.particles.sort((a,b) => {return a.radius - b.radius})
    }
  }
  
  handleParticles(context){
    this.particles.forEach(particle => {
      particle.draw(context);
      particle.update();
    })
  }
}

const effect = new Effect(canvas);

console.log(effect.particles[5])

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  effect.handleParticles(ctx)

  requestAnimationFrame(animate)
}

animate()