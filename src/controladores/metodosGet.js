const bancodedados = require("../bancodedados");

const listarConsultasMedicas = (req, res) => {
  const todasAsConsultas = bancodedados.consultas;

  if (todasAsConsultas.length === 0) {
    return res.status(204).send();
  }
  return res.send(todasAsConsultas);
};


const mostrarLaudo = (req, res) => {
  const { identificador_consulta } = req.query;

  // const consultaSelecionada = bancodedados.consultasFinalizadas.find((consulta) => {
  //   return consulta.identificador === Number(identificador_consulta)  
  // });

  // if (!consultaSelecionada) {
  //   return res.status(400).mensa
  // }

  const laudoSelecionado = bancodedados.laudos.find((laudo) => {
    return laudo.identificadorConsulta === Number(identificador_consulta)  
  });

 if (!laudoSelecionado) {
  res.status(500).json({"mensagem": "Laudo não encontrado."})
 }

  return res.send(laudoSelecionado)
};




const consultasDeUmMedico = (req, res) => {
  const {identificador_medico } = req.query

  if(!identificador_medico) {
    res.status(400).json({"mensagem": "Por favor, informar a identificação do médico."})
  }

  const idMedicoSelecionado = bancodedados.consultorio.medicos.find((medico) => {
    if (medico.identificador === Number(identificador_medico)) {
      return medico.identificador;
    }
    return false;
  })

  if (!idMedicoSelecionado) {
    res.status(404).json({"mensagem": "Médico não encontrado na base."})
  }

  const consultasDoMedico = bancodedados.consultasFinalizadas.filter((consulta) => {
    return consulta.identificadorMedico === Number(idMedicoSelecionado.identificador);
  })

  return res.send(consultasDoMedico);

};



module.exports = {
  listarConsultasMedicas,
  mostrarLaudo,
  consultasDeUmMedico
}