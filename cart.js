/* Date created: 1 Jun
author: greatsilas23
modified: 1 Jun 
*/
class canvas{
constructor(init, final, height){
this.init = init
this.final = final
this.height = height
this.width = 20
this.x = 400
this.y = 400
}
position(z){
let position = '<section>'
for(let j = 0; j <= this.height; j = j + this.width){
for(let i = this.init; i <= this.final; i = i + this.width){
position = position.concat('<span style="height: ').concat(this.width).concat('px; width: ').concat(this.width).concat('px; z-index: ').concat(z).concat('; position: absolute; top: ').concat(j).concat('px; left: ').concat(i).concat('px; background-color: black; border: solid 2px black;">').concat('</span>')
}
}

position = position.concat('</section>')
return position
}
padding(z){
let padding = ''
for(let j = this.height; j <= this.y; j = j + this.width){
for(let i = 0; i <= this.init; i = i + this.width){
padding = padding.concat('<span style="width: ').concat(this.width).concat('px; height: ').concat(this.width).concat(' position: absolute; z-index: ').concat(z).concat('; top: ').concat(j).concat('px; left: ').concat(i).concat('px; background-color: red; border: solid 2px black; ">').concat('</span>')
}
for(let k = this.final; k <= this.y; k = k + this.width){
padding = padding.concat('<span style="width: ').concat(this.width).concat('px; height: ').concat('px; z-index: ').concat(z).concat('; position: absolute; top: ').concat(j).concat('px; left: ').concat(k).concat('px; background-color: red; border: solid 2px black;">').concat('</span>')
}
}

return padding
}
fill(z){
let fill = '<section>'
for(let i = 0; i <= this.x; i = i + this.width){
for(let j = 0; j <= this.y; j = j + this.width){
fill = fill.concat('<span style="width: ').concat(this.width).concat('px; height: ').concat(this.width).concat('px; z-index: ').concat(z).concat('; position: absolute; top: ').concat(i).concat('px; left: ').concat(j).concat('px; background-color: red; border: solid 2px black;">').concat('</span>')
}
}
fill = fill.concat('</section>')
return fill
}
}
class sprite extends canvas{
constructor(h, w){
	this.h = h
	this.w = w
}
spawn(){
let i = 0
let item = ''
while(i <= this.x){
item = item.concat(new canvas(0, i, 10))
item.position(3)
item.padding(3)
i = i + this.width
}
}
