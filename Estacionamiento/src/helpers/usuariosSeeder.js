import { crearUsuario } from '../services/usuariosService.js'
import { Usuario } from '../classes/usuario.js'

async function UsuarioSeeder(){
  const usuarios = [
    new Usuario('Francisco Janza', 'francisco.janza@dev.ort.edu.ar', 'muchoFront', 'administrador'),
    new Usuario('Juan Fox', 'juan.fox@dev.ort.edu.ar', 'muchaInfra', 'administrador'),
    new Usuario('Charles Brown', 'charles.brown@dev.ort.edu.ar', 'thisAintReal', 'cliente'),
    new Usuario('John Doe', 'john.doe@dev.ort.edu.ar', 'notAPassword', 'cliente'),
  ]

  usuarios.forEach(async usuario => {
    console.log(`${usuario.email}`)
    await crearUsuario(usuario)
  });
}

console.log("Seedeando backend con usuarios.")
await UsuarioSeeder()
console.log("Seeding finalizado.")