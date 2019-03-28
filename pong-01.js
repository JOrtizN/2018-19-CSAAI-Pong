function main()
{
  console.log("Pong: Main: Start!")

// tiene acceso a toda la ventana, a todo el navegador y todo-> window.
  //leer las teclas de teclado:
  window.onkeydown = (e) =>{
    e.preventDefault(); //deshabilito todo y teclas solo la uso yo mientras tenga el foco;
    console.log(e.key);
    if (e.key == 'a'){
      console.log('Has apretado la tecla A');
      }
    }

  var canvas = document.getElementById('display') // document accede a todo el html
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");
  //-- Puntuación, Texto
  ctx.font = '70px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText("0", canvas.width*0.4, canvas.height*0.15);
  ctx.fillText("0", canvas.width*0.54, canvas.height*0.15);

  //-- Raquetas
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(50,100,10,40);
  ctx.fillRect(550,300,10,40);
  //-- Linea que divide el campo
  ctx.strokeStyle = "white";
  ctx.setLineDash([4,14]);
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();
  //-- Pelota
  ctx.beginPath();
  ctx.arc(150,200,5,0,2*Math.PI)
  ctx.fillStyle = 'yellow';
  ctx.fill()

  var bola = {
    x:0,
    y:0,
    x_init:50,
    y_init:50,
    //velocidad, si pones la misma velocidad en x y en y se mueve en diagonal si alguno 1, recto
    vx: 20,
    vy: 1,

    ctx: null,

    width: 5,
    height: 5,

    init: function(ctx){
      console.log('bola: init');
      this.reset();
      this.ctx = ctx;
    },
    draw: function () {
      console.log('bola: draw');
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    update: function () {
      console.log('bolas: update');
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    },
    reset:function () {
      this.x = this.x_init;
      this.y = this.y_init;
    },
  }
  bola.init(ctx);
  bola.draw();
  var timer = null;
  var sacar = document.getElementById('sacar');
  sacar.onclick = ()=>{
    console.log("Click");
    // Lanzar el timer
      if(!timer){
        timer = setInterval(()=>{
          console.log('tiempo');
          //--Actualizar bola
          bola.update()

          //borrr el canvas
          ctx.clearRect(0,0,canvas.width, canvas.height);
          bola.draw();

          //Terminar
          if (bola.x > canvas.width){
            clearInterval(timer);
            timer = null;
            bola.reset();
            bola.draw();
          }
        }, 20); //tiempo en el que se actualiza, por tanto, afecta en la velocidad.
      }
  }

}
