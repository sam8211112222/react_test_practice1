import {getAllByTestId, render, screen, within} from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () =>{
    const users = [
        {name: 'Sam', email: 'sam@yageo.com'},
        {name: 'jan', email: 'jan@yageo.com'}
    ]
    render(<UserList users={users}/>)
    return {users}
}

test('render one row per person', () => {
    // solution1
    // const {container}=render(<UserList users={users}/>)
    // const rows = container.querySelectorAll('tbody tr')

    // solution2
    // render(<UserList users={users}/>)

    // extract duplicate code
    renderComponent()

    const rows = within(screen.getByTestId('users')).getAllByRole('row')
    expect(rows).toHaveLength(2)
})

test('render email and name each row', () => {

    // extract duplicate code
    const {users} = renderComponent();

    const rows = within(screen.getByTestId('users')).getAllByRole('row')
    expect(rows).toHaveLength(2)

    for (let user of users) {
        const name = screen.getByRole('cell', {name: user.name})
        const email = screen.getByRole('cell', {name: user.email})
        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    }
})
