import { crearUsuario } from '../services/usuariosService.js'
import { Usuario } from '../classes/usuario.js'

async function usuarioSeeder(){
  const usuarios = [
    new Usuario('Francisco Janza', 'francisco.janza@dev.ort.edu.ar', 'muchoFront', 'administrador'),
    new Usuario('Juan Fox', 'juan.fox@dev.ort.edu.ar', 'muchaInfra', 'administrador'),
    new Usuario('Diego Sperber', 'diego.sperber@dev.ort.edu.ar', 'ingenieri', 'administrador'),
    new Usuario('Tomas Balduzzi', 'tomas.balduzzi@dev.ort.edu.ar', 'ingenieriCivil', 'administrador'),
    new Usuario('Charles Brown', 'charles.brown@dev.ort.edu.ar', 'thisAintReal', 'cliente'),
    new Usuario('John Doe', 'john.doe@dev.ort.edu.ar', 'notAPassword', 'cliente')
  ]

  usuarios.forEach(async usuario => {
    console.log(`Creando ${usuario.email}`)
    await crearUsuario(usuario)
  });
}

//Seeding the backend (usuarios)
console.log("Seedeando backend con usuarios.")
await usuarioSeeder()
console.log("Seeding finalizado.")