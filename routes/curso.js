const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Controllers
const { postCurso, putCurso, deleteCurso, getCursos, getCursoPorID, putAgregarCurso, getCursoAlumnos } = require('../controllers/curso');
const { existeCursoPorId, alumnoAsignado } = require('../helpers/db-validators');
const { esMaestroRole } = require('../middlewares/validar-roles');
const { validarCursos, validarAlumno } = require('../middlewares/validar-alumno');

const router = Router();

//Manejo de rutas

// Obtener todo de producto - publico
router.get('/', getCursos);

// Obtener un producto por id - publico
router.get('/mostrarCM', [
    validarJWT,
    esMaestroRole,
    validarCampos,
], getCursoPorID);


router.get('/mostrarCPA', [
    validarJWT,
    validarCampos,
], getCursoAlumnos);

// Crear producto - privada - cualquier persona con un token válido
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    esMaestroRole
], postCurso);

// Actuaizar producto - privada - cualquier persona con un token válido
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCursoPorId),
    esMaestroRole,
    validarCampos
], putCurso);

router.put('/agregarC/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCursoPorId),
    validarCursos,
    validarCampos
], putAgregarCurso);

//Borrar un producto - privado - Solo el admin puede eliminar una categoria (estado: false)
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeCursoPorId),
    esMaestroRole,
    validarCampos,
], deleteCurso);

module.exports = router;