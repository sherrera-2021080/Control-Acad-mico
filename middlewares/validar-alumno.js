const { response, request } = require('express');

const Curso = require("../models/curso");

const validarCursos = async (req = request, res = response, next) => {
    const { id } = req.usuario;
    const query = { alumnos: id }

    const numeros = await Curso.countDocuments(query)

    if (numeros >= 3) {
        return res.status(400).json({
            msg: `${id} No puedes asignarte mas de 3 cursos`
        });
    } else {
        next();
    }
}

const validarAlumno = async (req = request, res = response, next) => {
    const { id } = req.usuario;

    const query = { alumnos: id }

    const buscar = await Curso.find(query)

    if (buscar) {
        return res.status(400).json({
            msg: `Alumno: ${id} , Ya estas asignado este curso`
        });
    } else {
        next();
    }
}

module.exports = {
    validarCursos,
    validarAlumno
}