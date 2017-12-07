import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    screen: "list", // list, create
    contacts: []
  };

  componentDidMount = () => {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  };

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  };

  createContact = contact => {
    ContactsAPI.create(contact).then(() => {
      this.setState({
        contacts: this.state.contacts.concat([contact])
      });
    });
  };
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={c => {
                this.createContact(c);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
