# e-commerce

# Sobre o Projeto
Nossa API de e-commerce oferece recursos abrangentes para administradores, permitindo o lançamento de produtos, verificação de usuários e acesso a estatísticas mensais. Para os usuários, a API possibilita pesquisar produtos por categoria, nome e preço, além de oferecer a opção de redefinir a senha de forma segura por meio de um token enviado por e-mail.

## Para Administradores
A nossa API de e-commerce oferece funcionalidades robustas, com permissões de administradores que abrangem desde o lançamento de produtos, incluindo imagens, até a verificação de usuários cadastrados na plataforma. Os administradores também podem acessar estatísticas, como o número de usuários que entraram por mês e o rendimento mensal.

## Para o Usuário final
Para os usuários finais, a API possibilita a busca facilitada de produtos por categoria, nome, preço, gênero (masculino ou feminino) e outros critérios. Em caso de esquecimento da senha, os usuários têm a opção de redefinição. Nesse processo, um token é gerado e enviado para o e-mail do usuário. Com o token fornecido, o usuário pode efetuar a redefinição da senha de forma segura e conveniente."

## Back-end
- Node
- MongoDB
- Moongose
- Express
- Bcrypt
- JsonWebToken

## Como executar o projeto
### `npm run start`
Executar app no modo de desenvolvimento.
- Porta: 5000

você também podera ver erros pelo console.

## .env
`CONNECTIONSTRING` contem o link para se conectar ao mongoDB
`JWT_SEC` para o restante do jsonwebtoken
`MAILER_HOST` host fornecido pelo o mailtrap
`MAILER_PORT` porta fornecida pelo o mailtrap
`MAILER_USER` use fernecido pelo o mailtrap
`MAILER_PASS` password fornecido pelo mailtrap