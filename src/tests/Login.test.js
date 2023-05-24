import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// const NUMBER_SEX = 6;
const EMAIL_ACESS = 'xablau@gmail.com';

describe('Criar a tela de Login com suas funcionalidades', () => {
  it('A página Login renderizada na rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const loginEl = screen.getByText(/App de Receitas/i);
    expect(loginEl).toBeInTheDocument();
  });

  it('Verifica se é possivel digitar no input', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const InputLoginEmail = screen.getByTestId('email-input');
    expect(InputLoginEmail).toBeInTheDocument();

    userEvent.type(InputLoginEmail, EMAIL_ACESS);

    const InputPassword = screen.getByTestId('password-input');
    expect(InputPassword).toBeInTheDocument();

    userEvent.type(InputPassword, '1234567');
  });

  it('Verifica se e redirecionado para a Tela principal de comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const InputLoginEmail = screen.getByTestId('email-input');
    expect(InputLoginEmail).toBeInTheDocument();

    userEvent.type(InputLoginEmail, EMAIL_ACESS);

    const InputPassword = screen.getByTestId('password-input');
    expect(InputPassword).toBeInTheDocument();

    userEvent.type(InputPassword, '1234567');

    const btnEnter = screen.getByTestId('login-submit-btn');
    expect(btnEnter).toBeInTheDocument();

    userEvent.click(btnEnter);
    expect(history.location.pathname).toBe('/foods');
  });
});
