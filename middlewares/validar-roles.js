const { request, response } = require('express');


const esMaestroRole = (req = request, res = response, next)=>{
    
    //Verificar que el rol 
    const {rol, nombre} = req.usuario;

    if(rol !== 'ROL_MAESTRO'){
        return res.status(500).json({
            msg: `${ nombre } Necesita ser maestro para realizar esta funcion`
        });
    }else{
        next();
    }
}

const esAlumnoRole = (req = request, res = response, next)=>{
    
    //Verificar que el rol sea ADMIN_ROLE
    const {rol, nombre} = req.usuario;

    if(rol !== 'ROL_ALUMNO'){
        return res.status(500).json({
            msg: `${ nombre } Necesita se alumno para tener acceso a esta funcion`
        });
    }else{
        next();
    }
}

module.exports = {
    esMaestroRole,
    esAlumnoRole
}