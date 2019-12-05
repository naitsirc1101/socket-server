import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const desconectar = ( cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log(`Cliente ${cliente.id} desconectado`);

        const usuario = new Usuario( cliente.id);
        usuariosConectados.borrarUsuario(usuario.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const conectarCliente = ( cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);

}

export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', (  payload: { de: string, cuerpo: string }  ) => {

        console.log('Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload);

    });

}

export const login = ( cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        // console.log('configurando user', payload.nombre);
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        })
    });
}

