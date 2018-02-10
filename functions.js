

const niveles = 2;
        let teclas = generarTeclas(niveles)



        function siguienteNivel (nivelActual) {
          if (nivelActual ==  niveles) {
            return swal({
            	title: 'ganaste',
            	icon: 'success'

            });
          }

          swal ({
          	timer: 1000,
          	title: `Nivel ${nivelActual + 1}`,
          	button: {
          		visible: false
          	}
          }) 
        

          for (let i= 0; i <= nivelActual; i++  ) {
            setTimeout (() => activate(teclas[i]), (i + 1) * 1000 + 1000)
            
          }

          let turno = 0;
          let teclaActual = teclas[turno];
          window.addEventListener ('keydown', onkeydown)

          function onkeydown(ev) {
            let teclaPulsada = ev.keyCode;
            console.log(ev)
            console.log (teclaPulsada)
            if (teclaPulsada == teclaActual) {
              activate(teclaPulsada, {succes: true})
              turno++;
              if (turno > nivelActual ) {
                window.removeEventListener('keydown', onkeydown);
                setTimeout(()=> siguienteNivel(turno), 1500)

              }
              teclaActual = teclas[turno]

            }else {

              activate (teclaPulsada, {fail: true})
              window.removeEventListener('keydown', onkeydown);
              swal ({
              	title: 'perdiste',
            	icon: 'error',
                text: 'Quieres jugar de nuevo?',
                buttons: {
                	cancel: {
					    text: "NO",
					    value: false,
					    visible: true,
					    className: "",
					    closeModal: true,
					  },
					confirm: {
					    text: "SI",
					    value: true,
					    visible: true,
					    className: "",
					    closeModal: true
					  }
				}
              }).
              	then ((value)=> {
              		if(value){
              			teclas = generarTeclas(niveles);
              			siguienteNivel(0);
              			

              		}else {
              			swal({title: 'bye bitch' }) 

              			             		}
              	})
            }


          }




        }

        


        function generarTeclas(niveles) {
          return new Array(niveles).fill().map(generarTeclaAleatoria)

        }


        function generarTeclaAleatoria () {
          const min = 65;
          const max = 90
          return Math.round(Math.random() * (max - min) + min)
        }




        function getElementByKeyCode (keyCode) {
            return document.querySelector (`[data-key= "${keyCode}"]`) 
        }

        function activate (keyCode, opts = {}) {
          const el = getElementByKeyCode(keyCode);
          el.classList.add('active')

          if (opts.succes) {  
            el.classList.add('success')
          } else if (opts.fail) {
            el.classList.add ('fail')

          }
          setTimeout ( () => deactivate(el), 1000)
        }

        function deactivate (el) {
          el.className = 'key'
        }

        siguienteNivel(0)


