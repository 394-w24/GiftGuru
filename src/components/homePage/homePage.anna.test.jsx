import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import HomePage from './homePage';

describe('past recipient name input test', () => {
  test('Recipient name field is defined', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  
    expect(screen.getByLabelText('Recipient Name')).toBeDefined();
  });

  
  test('Recipient names are present in the select', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  
    const recipientsSelect = container.querySelector('#recipients-select');
    fireEvent.click(recipientsSelect);
  
    const existingRecipients = ['John Doe', 'Jane Smith'];
    existingRecipients.forEach(recipient => {
      const recipientOption = container.querySelector(`#recipients-select option[value="${recipient}"]`);
      expect(recipientOption).toBeDefined();
    });
  
    const addNewRecipientOption = container.querySelector('#recipients-select option[value="add-new"]');
    expect(addNewRecipientOption).toBeDefined();
  });


});