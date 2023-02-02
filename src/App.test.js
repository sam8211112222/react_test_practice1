import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from "./App";

test('can received a new user and render on the screen', () => {
  render(<App />);
  const nameInput = screen.getByRole('textbox',{
    name: /name/i
  });
  const emailInput = screen.getByRole('textbox',{name: /email/i })
  userEvent.click(nameInput)
  userEvent.keyboard('jan')

  userEvent.click(emailInput)
  userEvent.keyboard('jan@yageo.com')

  const button = screen.getByRole('button');
  userEvent.click(button);

  const name = screen.getByRole('cell',{name: 'jan'})
  const email = screen.getByRole('cell',{name: 'jan@yageo.com'})

  expect(name).toBeInTheDocument()
  expect(email).toBeInTheDocument()

});
