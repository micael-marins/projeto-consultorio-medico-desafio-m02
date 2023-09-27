![](https://i.imgur.com/xG74tOh.png)
# Este projeto foi desenvolvido como Desafio de Backend, proposto pela [Cubos Academy](https://cubos.academy).
Esta é uma **API** desenvolvida com o objeivo de implementao à um consultório médico um sistema que seja capaz de realizar algumas tarefas básicas como:

- Mostrar uma listagem de consultas e marcá-las como finalizadas ou não;
- Inserir ou deletar uma consulta ainda não finalizada;
- Editar dados de um paciente cadastrado em uma consulta não-finalizada;
- Consultar laudos cadastrados pelos médicos após finalização de consulta;
- Exibir quais atendimentos foram finalizados por um profissional.

## COMO CONFIGURAR?
O primeiro passo para ultilizar esta API é fazer um clone deste repositório. 
Após o mesmo ser clonado na sua máquina, instalar a principal biblioteca ultilizada: **Express**.

```javascript
npm install express

```
## COMO ULTILIZAR? 

Por ser uma API REST, este projeto utiliza o padrão de operações CRUD (Create, Read, Update, Delete). Portanto, é recomendável utilizar algum programa que faça as requisições corretamente. O utilizado nas demonstrações abaixo será o Insomnia. Para fazer o download, [clique aqui](https://insomnia.rest/download).

### Listar todas as consultas cadastradas

Para listar as consultas já registradas no sistema, ultilize a GET ```/consultas``` e ultilize insira o CNES e a senha do consultório, como no exemplo abaixo:





