const bancodedados = require("../bancodedados");
let idConsulta = 1;
let idLaudo = 1;



const criarConsultaMedica = (req, res) => {
  
  //MENSAGEM PARA INFORMAÇOES FALTANTES
  const mensagemErroFaltante = (faltante) => {
    res.status(404).json({ "mensagem": `É necessário informar ${faltante}.`})    
  }
  //MENSAGEM PARA INFORMACOES REPETIDAS OU ERRO 400
  const mensagemErro = (codErro, mensagem) => {
    res.status(codErro).json({ "mensagem": `${mensagem}`})    
  }
  

  const { tipoConsulta, valorConsulta, paciente } = req.body;

  try {

    //VERIFICA SE INFORMOU O TIPO DE CONSULTA
    if (!tipoConsulta) {
      return mensagemErroFaltante("o tipo da consulta")
    }
    
    //VERIFICA SE INFORMOU O VALOR DA CONSULTA
    if (!valorConsulta) {
      return mensagemErroFaltante("o valor da consulta")
    }

    //VERIFICA SE O VALOR É NUMERICO
    if (typeof valorConsulta !== "number") {
      return mensagemErroFaltante("um valor numérico para a consulta")
    }

    // //VERIFICA SE INFORMOU O OBJETO PACIENTE 
    if (!paciente) {
      return mensagemErroFaltante("os dados do paciente")
    }

    //VERIFICA SE INFORMOU OS DADOS DO PACIENTE
    if (
      !paciente.nome ||
      !paciente.cpf ||
      !paciente.dataNascimento ||
      !paciente.celular ||
      !paciente.email ||
      !paciente.senha
      ) {
        return mensagemErro(404, "Por favor, informar todos os dados do paciente.")
    }
    
    //VERIFICA SE O CPF OU EMAIL JA ESTAO VINCULADOS
    const verificadorCPFvinculado = bancodedados.consultas.find((pessoa) => {
      if (pessoa.paciente.cpf === paciente.cpf) {
        return true;
      }
      return false;
    });
    const verificadorEmailvinculado = bancodedados.consultas.find((pessoa) => {
      if (pessoa.paciente.email === paciente.email) {
        return true;
      }
      return false;
    });

    if (verificadorCPFvinculado || verificadorEmailvinculado) {
      return mensagemErro(400, "Já existe uma consulta em andamento com o cpf ou e-mail informado!")
    }
    
    //VERIFICA O TIPO DE CONSULTA E VINCULA O ID DO MEDICO ESPECIALIZADO
    let identificadorMedico = NaN;
    const atendeEspecialidade = bancodedados.consultorio.medicos.find((medico) => {
      if (medico.especialidade === tipoConsulta) {
        identificadorMedico = medico.identificador;
        return true
      }
      return false;
    })

    if (!atendeEspecialidade) {
      return mensagemErro(404, "O tipo da consulta informado não consta nas especialidades dos médicos na base.")
    }

    //CRIA ID UNICO PARA CONSULTA E FINALIZADA = FALSE
    const novaConsulta = {
      identificador: idConsulta++,
      tipoConsulta,
      identificadorMedico,
      finalizada: false,
      valorConsulta,
      paciente
    }

    //INSERE NO BANCO DE DADOS
    bancodedados.consultas.push(novaConsulta)

    return res.status(201).send();

  } catch (error) {
    return res.status(500).json({ "mensagem": error.message })
  }
  
};




const atualizarInfosConsulta = (req, res) => {
  
  const mensagemErro = (codErro, mensagem) => {
    res.status(codErro).json({ "mensagem": `${mensagem}`})    
  }
  
  const {identificadorConsulta} = req.params;
  const {nome, cpf, dataNascimento, celular, email, senha} = req.body;

  if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
    return mensagemErro(400, "É necessário que todos os dados sejam informados.");
  }


  const consultaSelecionada = bancodedados.consultas.find((consulta) => {
    if (consulta.identificador === Number(identificadorConsulta)) {
      return consulta;
    };
    return false
  });

  if (!consultaSelecionada) {
    return mensagemErro(400, "Insira um identificador de consulta válido.")
  }

  if (consultaSelecionada.finalizada) {
    return mensagemErro(400, "Não é possível alterar uma consulta finalizada.");
  }

  const cpfOriginal = consultaSelecionada.paciente.cpf;
  const emailOriginal = consultaSelecionada.paciente.email

  if (cpf !== cpfOriginal) {
    const temCPFigual =  bancodedados.consultas.find((pessoa) => {
      if (pessoa.paciente.cpf === cpf) {
        return mensagemErro(400, "Já existe uma consulta cadastrada com este CPF.");
      }
    })
  };

  if (email !== emailOriginal) {
    const temCPFigual =  bancodedados.consultas.find((pessoa) => {
      if (pessoa.paciente.email === email) {
        return mensagemErro(400, "Já existe uma consulta cadastrada com este email.");
      }
    })
  };

  consultaSelecionada.paciente = {
    nome,
    cpf, 
    dataNascimento, 
    celular, 
    email, 
    senha
  }

  return res.status(204).send()
};




const finalizarConsulta = (req, res) => {
  
  const mensagemErro = (codErro, mensagem) => {
    res.status(codErro).json({ "mensagem": `${mensagem}`})    
  }


  const { identificadorConsulta, textoMedico } = req.body;

  if (!identificadorConsulta || !textoMedico) {
    return mensagemErro(404, "Por favor, preencher todas as informações necessárias.");
  }

  const consultaSelecionada = bancodedados.consultas.find((consulta) => {
    if (consulta.identificador === Number(identificadorConsulta)) {
      return consulta;
    };
    return false
  });

  if (!consultaSelecionada) {
    return mensagemErro(400, "Insira um identificador de consulta válido.")
  }

  if (consultaSelecionada.finalizada) {
    return mensagemErro(400, "Esta consulta já foi finalizada.");
  }

  if (textoMedico.length < 1 || textoMedico.length > 200) {
    return mensagemErro(400, "O tamanho do textoMedico não está dentro do esperado.");
  }

  consultaSelecionada.finalizada = true;

  const novoLaudo = {
    identificador: idLaudo++,
    identificadorConsulta: Number(identificadorConsulta),
    identificadorMedico: consultaSelecionada.identificadorMedico,
    textoMedico,
    paciente: consultaSelecionada.paciente
  };

  bancodedados.laudos.push(novoLaudo);

  const {identificador, tipoConsulta, identificadorMedico, finalizada, valorConsulta, paciente} = consultaSelecionada;

  const consultaFinalizada = {
    identificador,
    tipoConsulta,
    identificadorMedico,
    finalizada,
    identificadorLaudo: novoLaudo.identificador,
    valorConsulta,
    paciente
  };
  
  bancodedados.consultasFinalizadas.push(consultaFinalizada);

  return res.status(200).send(bancodedados.consultasFinalizadas)
};



module.exports = {
  criarConsultaMedica,
  atualizarInfosConsulta,
  finalizarConsulta
}