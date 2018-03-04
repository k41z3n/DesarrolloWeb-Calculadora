document.addEventListener('DOMContentLoaded', function(){ 
	Calculadora.init();
})
var entries = []
var inputs = document.getElementById('display')
var result = 0
var mathFunctios = {
	"simbols": [
		{ name:"mas",sing:"+"} ,
		{ name:"menos",sing:"-"} ,
		{ name:"por",sing:"*"} ,
		{ name:"dividido",sing:"/"} ,
		{ name:"on",sing:"on"} ,
		{ name:"sign",sign:"+/-"} ,
		{ name:'punto',sign:'.'} ,
		{ name:'igual',sign:'=' }
	]
}
Calculadora = {
	init: function(){
		this.keypress()
	},
	keypress: function() {
		var self = this
		var tecla = document.getElementsByClassName("tecla");
		for (var i=0; i < tecla.length; i++) {
		    tecla[i].onclick = function(){
				self.SetEvent(this.id)
		    }
			tecla[i].addEventListener("mousedown", function(){
					this.style.transform = "scale(.9)"
			});
			tecla[i].addEventListener("mouseup", function(){
					this.style.transform = "scale(1)"
			});
		}
	},
	SetEvent: function(val){
		var self = this
		let lastPos = entries.length-1 
		let lastVal = entries[lastPos]
		if (!isNaN(val) && inputs.innerHTML.length <= 8 ) {
			if( inputs.textContent == "0" && val == "0")
				return
			else if( inputs.innerHTML == "0" && val != "0"){
				inputs.innerHTML = val
			}else{
				inputs.innerHTML += val
			}
		}else{
			self.IsAfunction(val);
		}
	},
	IsAfunction: function(val){
		var self = this
		for (var i = 0; i < mathFunctios.simbols.length; i++){
			if (mathFunctios.simbols[i].name === val){
				var sg = mathFunctios.simbols[i].sing
					switch(val) {
						case "mas":
						case "menos":
						case "por":
						case "dividido":
							self.setSimbol(sg)				
						break;
						case "sign":
							self.SwitchVal(inputs.innerHTML);
						break;
						case "on":
							entries = []
							inputs.innerHTML = "0"
						break;
						case "punto":
							self.BtnPunto(inputs.innerHTML)
						break;
						case "igual":
							self.BtnResult()
						break;
					}
			}	
		}

	},
	setSimbol: function(sg){
		var self = this
		let lastPos = entries.length-1
		let lastVal = entries[lastPos]

		if ( lastVal == undefined) { 
			entries.push(inputs.innerHTML)
			entries.push(sg)
			inputs.innerHTML = ""
			console.log('empty')
		}else if( isNaN(lastVal) == true && inputs.innerHTML == "" ){
			if( lastVal != sg){
				entries.pop()
				entries.push(sg)
			}
		}else{
			entries.push(inputs.innerHTML)
			entries.push(sg)
			inputs.innerHTML = ""
		}

	},
	SwitchVal: function(str){
		let pos = 0
		var output
		if ( inputs.innerText.indexOf('-')== -1 && inputs.innerHTML != "0" ) {
		 	output = -Math.abs(str);
			inputs.innerHTML = output
		}else{
		 	output = Math.abs(str);
			inputs.innerHTML = output
		}
	},
	BtnPunto: function(str){
		if( inputs.innerText.indexOf('.') == -1 ){
			inputs.innerHTML += '.'
		}
	},
	BtnResult: function(){
		entries.push(inputs.innerHTML)
		var temp = entries.join('')
		var result = eval(temp)
		entries = []
		inputs.innerHTML = result.toString().slice(0,8);
	}	
}
