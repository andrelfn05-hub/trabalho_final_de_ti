import { Usuario } from '../Usuario';

describe('Entidade: Usuario', () => {
  
  it('deve criar uma instância de Usuário válida com todos os parâmetros', () => {
    const usuario = new Usuario(
      'João Lucas',
      'joao@email.com',
      'senha123',
      'cliente',
      '123.456.789-00',
      '84999999999'
    );

    // Testando os Getters
    expect(usuario.nome).toBe('João Lucas');
    expect(usuario.email).toBe('joao@email.com');
    expect(usuario.senha).toBe('senha123');
    expect(usuario.role).toBe('cliente');
    expect(usuario.cpfCnpj).toBe('123.456.789-00');
    expect(usuario.telefone).toBe('84999999999');
  });

  it('deve validar corretamente um usuário com dados válidos (método validar)', () => {
    const usuario = new Usuario(
      'Maria Souza',
      'maria@email.com',
      '123456',
      'admin'
    );

    // O método validar() da sua imagem retorna um booleano (true/false)
    expect(usuario.validar()).toBe(true);
  });

  it('deve retornar false no método validar() se o e-mail ou nome forem inválidos', () => {
    // E-mail sem @ e senha curta (< 6 caracteres)
    const usuarioInvalido = new Usuario(
      '',
      'emailsemarrouba.com',
      '123'
    );

    expect(usuarioInvalido.validar()).toBe(false);
  });

  it('deve disparar exceção ao tentar alterar dados por setters inválidos', () => {
    const usuario = new Usuario('Carlos Santos', 'carlos@email.com', '123456');

    // Testando as validações dos setters (throw new Error)
    expect(() => {
      usuario.nome = 'Ab'; // Menos de 3 caracteres
    }).toThrow('O nome deve ter pelo menos 3 caracteres.');

    expect(() => {
      usuario.email = 'email-invalido'; // Sem @ ou sem ponto
    }).toThrow('Formato de email inválido.');

    expect(() => {
      usuario.senha = '123'; // Menos de 6 caracteres
    }).toThrow('A senha deve ter pelo menos 6 caracteres.');
  });

  it('deve converter de e para JSON corretamente (fromJSON e toJSON)', () => {
    const dadosJSON = {
      nome: 'Ana Lima',
      email: 'ana@email.com',
      senha: 'minhasenhasegura',
      role: 'cliente' as const,
      cpfCnpj: '111.222.333-44',
      telefone: '84988887777'
    };

    // Testa o método estático fromJSON
    const usuario = Usuario.fromJSON(dadosJSON);
    expect(usuario).toBeInstanceOf(Usuario);
    expect(usuario.email).toBe('ana@email.com');

    // Testa o método toJSON
    const jsonExportado = usuario.toJSON();
    expect(jsonExportado).toEqual(dadosJSON);
  });

});