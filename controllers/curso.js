const { request, response, json } = require("express");
const Curso = require("../models/curso");
const { countDocuments } = require("../models/usuario");
const Usuario = require("../models/usuario");

const getCursos = async (req = request, res = response) => {
  const query = { estado: true };

  const listaCurso = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).populate("usuario", "nombre"),
  ]);

  res.json({
    msg: "get Api - Controlador Curso",
    listaCurso,
  });
};

const getCursoPorID = async (req = request, res = response) => {
  const _id = req.usuario.id;
  const query = { estado: true, usuario: _id };

  const listaCursosProfesores = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).populate("usuario", "nombre"),
  ]);

  res.json({
    msg: "get Api - Controlador Curso",
    listaCursosProfesores,
  });
};

const getCursoAlumnos = async (req = request, res = response) => {
  const _id = req.usuario;
  const query = { estado: true, alumnos: _id };

  const listaCursosAlumnos = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).populate("usuario", "nombre")
  ]);

  res.json({
    msg: "get Api - Controlador Curso",
    listaCursosAlumnos,
  });
};

const postCurso = async (req = request, res = response) => {
  const { estado, descripcion, usuario, ...body } = req.body;
  const cursoDB = await Curso.findOne({ nombre: body.nombre });
  const nombre = req.body.nombre.toUpperCase();
  //validacion si el producto ya existe
  if (cursoDB) {
    return res.status(400).json({
      msg: `El curso ${cursoDB.nombre}, ya existe en la DB`,
    });
  }
  //Generar la data a guardar
  const data = {
    nombre,
    descripcion,
    usuario: req.usuario._id,
  };
  const curso = await Curso(data);
  //Guardar en DB
  await curso.save();
  res.status(201).json(curso);
};

const putAgregarCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, descripcion, estado, usuario, ...resto } = req.body;

  const cursoAgregado = await Curso.findByIdAndUpdate(
    id,
    { $push: { alumnos: req.usuario.id } },
    { new: true }
  );

  res.status(201).json(cursoAgregado);

};

const putCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...restoData } = req.body;

  if (restoData.nombre) {
    restoData.nombre = restoData.nombre.toUpperCase();
    restoData.usuario = req.usuario._id;
  }

  const cursoActualizado = await Curso.findByIdAndUpdate(id, restoData, {
    new: true,
  });
  res.status(201).json({
    msg: "PUT CURSO",
    cursoActualizado,
  });
};

const deleteCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const cursoEliminado = await Curso.findByIdAndDelete(id);

  res.json({
    msg: "DELETE",
    cursoEliminado,
  });
};

module.exports = {
  getCursos,
  getCursoPorID,
  postCurso,
  putCurso,
  deleteCurso,
  putAgregarCurso,
  getCursoAlumnos,
};
