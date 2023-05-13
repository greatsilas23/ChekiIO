/* Date created: 31 Mar
   Date modified: 
*/
class canvas {
    constructor(){
        this.top = 0
        this.left = 0
    }
    fill(item){
        for(let i = 0; i <= 3; i++){
            for(let j = 0; i <= 3; j++){

            }
       
        }
    }
}
class line{
    constructor(){
        this.x = new Array(0, 1, 2, 3)
        this.y = new Array(0, 1, 2, 3)
        this.grad = (this.y[this.y.length] - y[0]) / (this.x[this.x.length] - x[0])
        this.intercept = 0
    }
    getIntercept(){
        for(let i = 0; i <= 3; i++){
            if(this.x[i] == 0){
                this.intercept = this.y[i]
            }
        }
        return this.intercept
    }
    draw(){
        for(let i = 0; i <= 3; i++){
            for(let j = 0; j <= 3; j++){
                body.innerHTML += '<div style="width: 20px; height: 20px; position: absolute; top: '.concat(i.toString()).concat('px; left: ').concat(j.toString()).concat('px; background-color: black;">').concat(Math.floor(Math.random())).concat('</div>')
            }
        }
    }
}


const body = document.querySelector('body')
console.log(new line().draw())