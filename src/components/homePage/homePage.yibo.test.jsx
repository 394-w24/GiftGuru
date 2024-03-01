import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import HomePage from './homePage';

describe('HomePage input tests', () => {
  test('Initial state of form elements', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Recipient Gender')).toBeDefined();
  });

  test('Entering detailed information updates state', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  
    const detailedInfoInput = screen.getByLabelText("Information about the recipient");
  
    expect(detailedInfoInput.value).toBe('');
  
    fireEvent.change(detailedInfoInput, { target: { value: 'Test information' } });
  
    expect(detailedInfoInput.value).toBe('Test information');
  });

  test('Selecting gender shows three options', () => {
    const {container} =render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const select = container.querySelector("#gender-select")
    fireEvent.click(select);
    const male = container.querySelector("#male")
    expect(male).toBeDefined()
    const female = container.querySelector("#female")
    expect(female).toBeDefined()
    const other = container.querySelector("#other")
    expect(other).toBeDefined()
  });






});
