const sessions = [
    {
      id: 1,
      title: "Insira seus dados",
      checkbox: [],
      textInput: [
        {
          id: 1,
          label: 'Nome',
          placeHolder: 'Digite seu nome completo'
        },{
          id: 2,
          label: 'Senha',
          placeHolder: 'Digite sua Senha',
          secureTextEntry: true
        },
        {
          id: 3,
          label: 'Email',
          placeHolder: 'Digite seu email'
        }
      ]

    },
    {
      id: 2,
      title: 'Insira o Nome do seu Estabeleciomento',
      checkbox: [],
      textInput: [
        {
          id: 1,
          label: 'Estabelecimento',
          placeHolder: 'Digite seu estabelecimento'
        }],

    }

  ]

  export {sessions}