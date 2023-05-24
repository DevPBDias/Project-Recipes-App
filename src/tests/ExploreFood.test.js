import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import mockExploreFoods from '../mock/mockExploreFoods';
import ingredientsFoods from '../mock/mockIngredientsFoods';

const REDIRECIONAMENTO = '/explore/foods';

describe('Testa a Toda há tela do exploreFoods', () => {
  test(`Ao clicar no botão exploreFoods
  e redirecionado para /explore/foods/ingredients`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);

    const btnExploreByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnExploreByIngredient).toBeInTheDocument();

    userEvent.click(btnExploreByIngredient);

    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  test('testa se ao entrar na pagina de ingredientes foods a api e chamada', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientsFoods),
    });
    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);

    const btnExploreByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnExploreByIngredient).toBeInTheDocument();

    userEvent.click(btnExploreByIngredient);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    jest.restoreAllMocks();
  });

  test('Ao clicar no botão explore foods e redirecionado para /explore/foods', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockExploreFoods),
    });

    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);

    const btnExploreSurpriseMe = screen.getByRole('button', { name: 'Surprise me!' });
    expect(btnExploreSurpriseMe).toBeInTheDocument();

    userEvent.click(btnExploreSurpriseMe);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    expect(history.location.pathname).toBe('/explore/foods');
    jest.restoreAllMocks();
  });

  test('testa se ao clicar no botão por nacionalidades e redirecionado', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockExploreFoods),
    });

    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);

    const btnExploreNacionality = screen.getByRole('button', { name: 'By Nationality' });
    expect(btnExploreNacionality).toBeInTheDocument();

    userEvent.click(btnExploreNacionality);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
