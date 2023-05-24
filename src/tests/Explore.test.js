import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a Toda há tela do explore', () => {
  test('Ao clicar no botão explore foods e redirecionado para /explore/foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const btnExplorefoods = screen.getByRole('button', { name: /Explore Foods/i });
    expect(btnExplorefoods).toBeInTheDocument();

    userEvent.click(btnExplorefoods);

    expect(history.location.pathname).toBe('/explore/foods');
  });

  test('Ao clicar no botão explore drinks e redirecionado para /explore/drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const btnExploreDrinks = screen.getByRole('button', { name: /Explore Drinks/i });
    expect(btnExploreDrinks).toBeInTheDocument();

    userEvent.click(btnExploreDrinks);

    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
