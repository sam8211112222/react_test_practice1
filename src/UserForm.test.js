import {render, screen} from "@testing-library/react";
import UserForm from "./UserForm";
import userEvent from "@testing-library/user-event";
import App from "./App";

test('it shows 2 inputs and 1 button', () => {
    // render component
    render(<UserForm/>)

    // check elements
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    expect(inputs).toHaveLength(2)
    expect(button).toBeInTheDocument()

})

test('it calls onUserAdd when the form is submitted', () => {
    const mock = jest.fn()
    render(<UserForm onUserAdd={mock}/>)
    const [nameInput, emailInput] = screen.getAllByRole('textbox')
    userEvent.click(nameInput)
    userEvent.keyboard('jane')

    userEvent.click(emailInput)
    userEvent.keyboard('jane@yageo.com')

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith({name: 'jane', email: 'jane@yageo.com'})
})

test('empties input after form is submitted', () => {
    const mock = jest.fn()
    render(<UserForm onUserAdd={mock}/>)

    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    });
    const emailInput = screen.getByRole('textbox', {name: /email/i})
    userEvent.click(nameInput)
    userEvent.keyboard('jan')

    userEvent.click(emailInput)
    userEvent.keyboard('jan@yageo.com')

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
});

